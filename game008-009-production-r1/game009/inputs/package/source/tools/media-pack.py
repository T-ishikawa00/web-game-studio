#!/usr/bin/env python3
"""Package explicitly accepted Game009 raw QA captures for marketing review.

This tool transcodes only selected, hash-verified WebM sources. It never edits
or removes a source. It preserves the full frame in a 720x720 canvas, uses
constant 30 fps H.264/yuv420p, preserves audio timestamp gaps during resampling,
and pads/trims that audio to the original video duration. It adds no music,
narration, overlays, speed changes, or gameplay outcomes.
"""

from __future__ import annotations

import argparse
import datetime as dt
import hashlib
import json
import math
import os
import re
import struct
import subprocess
import sys
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
DEFAULT_EVIDENCE = ROOT / "qa" / "final-media-evidence.json"
DEFAULT_OUTPUT_DIR = ROOT / "marketing" / "clips"
FFMPEG = (
    ROOT
    / ".media-tools"
    / "imageio_ffmpeg"
    / "binaries"
    / "ffmpeg-win-x86_64-v7.1.exe"
)
DEFAULT_INCLUDE = ("1790964826149", "1790964982494", "1790965867522")

DESCRIPTIONS: dict[str, str] = {
    "1790964826149": (
        "Kiln commission 1/3 — Dawn bowl, “Soften the glaze.” The sampled HUD "
        "countdown moves from 90s to 75s over the first 15 seconds; stoking and "
        "vent state remain visible."
    ),
    "1790964982494": (
        "Kiln commission 2/3 — Moss vase, “Open the moss glaze,” then “Cool into "
        "the deep green.” The sampled HUD countdown moves from 80s to 65s over "
        "the first 15 seconds while the vent is adjusted."
    ),
    "1790965867522": (
        "Kiln commission 3/3 — Evening pitcher, “Cool gently to choose the final "
        "sheen.” The player cools, finishes manually, and reaches the three-vessel "
        "result showing 75 / 76 / 78."
    ),
}

GAMEPLAY_PROVENANCE = {
    "ordinary_keyboard_input": True,
    "input_summary": "Space taps, Arrow-key vent steps, and F for finish.",
    "input_evidence": "qa/full-play-r3.md",
    "input_trace_scope": (
        "Campaign/session-level QA record; the media evidence does not contain "
        "frame-synchronized key-event logs."
    ),
    "real_elapsed_gameplay": True,
    "elapsed_evidence": (
        "Raw video timestamps/durations plus the visible game countdown in the "
        "sampled contact sheets; no clock acceleration or speed edit is claimed."
    ),
    "frozen_rules": True,
    "rules_evidence": (
        "qa/full-play-r3.md records identical thermal rules/profile timings "
        "between compared routes and unchanged thermal rules after the copy fix."
    ),
    "injected_wins": False,
    "lens_content": False,
}

PRESERVED_FAILED_ATTEMPTS = [
    {
        "capture_id": "1790964826149",
        "path": (
            "qa/media-transcode-failures/"
            "ember-glaze-clip-1790964826149-first-pass-audio-timeline-mismatch.mp4"
        ),
        "sha256": "82f7148fa8945464696e4869d85593359014743808fcaaef9200ba8de1490236",
        "bytes": 494303,
        "source_path": "qa/captures/ember-glaze-clip-1790964826149.webm",
        "source_sha256": "a4722e4cc5eacd2a8584c2055c7c5841ae54ba9eea535ee1b21357bdd5af3eff",
        "source_video_duration_seconds": 19.971,
        "failed_output_movie_duration_seconds": 19.971,
        "failed_output_decoded_audio_duration_seconds": 12.096,
        "initial_audio_decode_without_timestamp_gap_fill_seconds": 11.16,
        "status": "FAILED_CHECK_PRESERVED_EXCLUDED_FROM_FINAL_CLIPS",
        "failure": (
            "Async-disabled resampling omitted sparse source Opus timestamp gaps; "
            "decoded audio was 12.096s against 19.971s video, outside the one-frame "
            "duration check. The output is retained for audit and is not a deliverable."
        ),
    }
]


def sha256_file(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for block in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def rel(path: Path) -> str:
    return path.resolve().relative_to(ROOT.resolve()).as_posix()


def run_checked(command: list[str], *, capture: bool = True) -> subprocess.CompletedProcess[str]:
    result = subprocess.run(
        command,
        stdout=subprocess.PIPE if capture else subprocess.DEVNULL,
        stderr=subprocess.PIPE,
        text=True,
        encoding="utf-8",
        errors="replace",
        check=False,
    )
    if result.returncode:
        detail = (result.stderr or "")[-1800:].strip()
        raise RuntimeError(
            f"Command failed with exit {result.returncode}: {Path(command[0]).name}; "
            f"diagnostic tail: {detail}"
        )
    return result


def iter_mp4_boxes(data: bytes, start: int, end: int):
    offset = start
    while offset + 8 <= end:
        size, kind = struct.unpack_from(">I4s", data, offset)
        header = 8
        if size == 1:
            if offset + 16 > end:
                raise ValueError("Truncated extended MP4 atom.")
            size = struct.unpack_from(">Q", data, offset + 8)[0]
            header = 16
        elif size == 0:
            size = end - offset
        if size < header or offset + size > end:
            raise ValueError("Invalid MP4 atom bounds.")
        yield kind.decode("ascii", errors="replace"), offset, header, size
        offset += size


def mp4_movie_metadata(path: Path) -> dict[str, Any]:
    data = path.read_bytes()
    boxes = list(iter_mp4_boxes(data, 0, len(data)))
    positions = {kind: offset for kind, offset, _, _ in boxes}
    if b"moov" not in [kind.encode() for kind, *_ in boxes] or b"mdat" not in [
        kind.encode() for kind, *_ in boxes
    ]:
        raise ValueError("Output MP4 lacks required moov/mdat atoms.")
    moov_box = next(item for item in boxes if item[0] == "moov")
    moov_start = moov_box[1] + moov_box[2]
    moov_end = moov_box[1] + moov_box[3]
    mvhd = next(
        (item for item in iter_mp4_boxes(data, moov_start, moov_end) if item[0] == "mvhd"),
        None,
    )
    if not mvhd:
        raise ValueError("Output MP4 has no movie header.")
    _, atom_start, header, atom_size = mvhd
    payload = atom_start + header
    version = data[payload]
    if version == 0:
        timescale = struct.unpack_from(">I", data, payload + 12)[0]
        duration_ticks = struct.unpack_from(">I", data, payload + 16)[0]
    elif version == 1:
        timescale = struct.unpack_from(">I", data, payload + 20)[0]
        duration_ticks = struct.unpack_from(">Q", data, payload + 24)[0]
    else:
        raise ValueError(f"Unsupported MP4 movie header version {version}.")
    if not timescale:
        raise ValueError("Output MP4 has zero movie timescale.")
    mdat_position = positions["mdat"]
    return {
        "duration_seconds": duration_ticks / timescale,
        "timescale": timescale,
        "duration_ticks": duration_ticks,
        "faststart_moov_before_mdat": positions["moov"] < mdat_position,
    }


def ffmpeg_stream_probe(ffmpeg: Path, path: Path) -> dict[str, Any]:
    command = [
        str(ffmpeg),
        "-hide_banner",
        "-v",
        "info",
        "-i",
        str(path),
        "-map",
        "0:v:0",
        "-map",
        "0:a:0",
        "-f",
        "null",
        "-",
    ]
    result = run_checked(command)
    text = result.stderr or ""
    video_line = next(
        (line for line in text.splitlines() if re.search(r"\bVideo:", line)), ""
    )
    audio_line = next(
        (line for line in text.splitlines() if re.search(r"\bAudio:", line)), ""
    )
    if not video_line or not audio_line:
        raise ValueError("Decoded output is missing a video or audio stream.")
    codec_match = re.search(r"\bVideo:\s*([A-Za-z0-9_]+)", video_line)
    pixel_match = re.search(r",\s*([A-Za-z0-9_]+)(?:\([^)]*\))?,\s*(\d+)x(\d+)", video_line)
    fps_match = re.search(r"\b([0-9]+(?:\.[0-9]+)?)\s*fps\b", video_line)
    audio_codec_match = re.search(r"\bAudio:\s*([A-Za-z0-9_]+)", audio_line)
    rate_match = re.search(r"\b(\d+)\s*Hz\b", audio_line)
    if not all((codec_match, pixel_match, fps_match, audio_codec_match, rate_match)):
        raise ValueError("Could not parse the decoded output stream metadata.")
    frame_counts = re.findall(r"\bframe=\s*(\d+)", text)
    return {
        "video_codec": codec_match.group(1).lower(),
        "pixel_format": pixel_match.group(1).lower(),
        "width": int(pixel_match.group(2)),
        "height": int(pixel_match.group(3)),
        "fps": float(fps_match.group(1)),
        "audio_codec": audio_codec_match.group(1).lower(),
        "audio_sample_rate_hz": int(rate_match.group(1)),
        "audio_channels": 2 if "stereo" in audio_line.lower() else (
            1 if "mono" in audio_line.lower() else None
        ),
        "decoded_video_frames": int(frame_counts[-1]) if frame_counts else None,
        "full_stream_decode_exit": result.returncode,
    }


def decoded_audio_metrics(ffmpeg: Path, path: Path) -> dict[str, Any]:
    command = [
        str(ffmpeg),
        "-v",
        "error",
        "-i",
        str(path),
        "-map",
        "0:a:0",
        "-acodec",
        "pcm_f32le",
        "-ar",
        "48000",
        "-ac",
        "2",
        "-f",
        "f32le",
        "pipe:1",
    ]
    process = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    assert process.stdout is not None
    assert process.stderr is not None
    count = 0
    clipped = 0
    peak = 0.0
    sum_squares = 0.0
    carry = b""
    while True:
        chunk = process.stdout.read(256 * 1024)
        if not chunk:
            break
        chunk = carry + chunk
        complete = len(chunk) - (len(chunk) % 4)
        carry = chunk[complete:]
        if not complete:
            continue
        for (sample,) in struct.iter_unpack("<f", chunk[:complete]):
            value = abs(float(sample))
            peak = max(peak, value)
            if value >= 0.999:
                clipped += 1
            sum_squares += float(sample) * float(sample)
            count += 1
    stderr = process.stderr.read().decode("utf-8", errors="replace")
    exit_code = process.wait()
    if exit_code:
        raise RuntimeError(
            f"Final audio decode failed (exit {exit_code}): {stderr[-1200:].strip()}"
        )
    if carry:
        raise ValueError("Final float-PCM decode ended on a partial sample.")
    if not count or count % 2:
        raise ValueError(f"Unexpected decoded stereo float sample count: {count}.")
    rms = math.sqrt(sum_squares / count)
    return {
        "decoded_sample_values": count,
        "decoded_frames_per_channel": count // 2,
        "decoded_duration_seconds": (count // 2) / 48000,
        "sample_rate_hz": 48000,
        "channels": 2,
        "peak_linear": peak,
        "peak_dbfs": 20 * math.log10(peak) if peak else None,
        "rms_dbfs": 20 * math.log10(rms) if rms else None,
        "clipped_sample_count_ge_0_999": clipped,
        "clipping_threshold_linear": 0.999,
        "decode_exit": exit_code,
    }


def encode_clip(
    ffmpeg: Path, source: Path, output: Path, duration: float
) -> dict[str, Any]:
    if output.exists():
        raise FileExistsError(
            f"Refusing to overwrite existing output: {rel(output)}"
        )
    output.parent.mkdir(parents=True, exist_ok=True)
    temporary = output.with_name(f"{output.stem}.partial{output.suffix}")
    if temporary.exists():
        raise FileExistsError(
            f"Refusing to overwrite prior partial output: {rel(temporary)}"
        )
    seconds = f"{duration:.6f}"
    video_filter = (
        "fps=30,"
        "scale=720:720:force_original_aspect_ratio=decrease:force_divisible_by=2,"
        "pad=720:720:(ow-iw)/2:(oh-ih)/2:black,"
        "setsar=1,format=yuv420p,"
        f"trim=duration={seconds},setpts=PTS-STARTPTS"
    )
    audio_filter = (
        "aresample=48000:async=1:first_pts=0,"
        "apad,"
        f"atrim=duration={seconds},"
        "asetpts=PTS-STARTPTS"
    )
    command = [
        str(ffmpeg),
        "-hide_banner",
        "-nostdin",
        "-n",
        "-i",
        str(source),
        "-filter_complex",
        f"[0:v:0]{video_filter}[v];[0:a:0]{audio_filter}[a]",
        "-map",
        "[v]",
        "-map",
        "[a]",
        "-t",
        seconds,
        "-c:v",
        "libx264",
        "-preset",
        "fast",
        "-crf",
        "20",
        "-pix_fmt",
        "yuv420p",
        "-r",
        "30",
        "-fps_mode",
        "cfr",
        "-video_track_timescale",
        "30000",
        "-c:a",
        "aac",
        "-b:a",
        "160k",
        "-ar",
        "48000",
        "-ac",
        "2",
        "-map_metadata",
        "-1",
        "-movflags",
        "+faststart",
        "-f",
        "mp4",
        str(temporary),
    ]
    run_checked(command)
    temporary.replace(output)
    return {"encoded_output": rel(output)}


def evidence_index(path: Path) -> tuple[dict[str, Any], dict[str, dict[str, Any]]]:
    evidence = json.loads(path.read_text(encoding="utf-8"))
    indexed: dict[str, dict[str, Any]] = {}
    for item in evidence.get("clips", []):
        match = re.search(r"(\d+)\.webm$", str(item.get("file", "")))
        if match:
            indexed[match.group(1)] = item
    return evidence, indexed


def capture_source(record: dict[str, Any], evidence_path: Path) -> Path:
    relative_path = Path(str(record["relative_path"]))
    source = (ROOT / relative_path).resolve()
    if not source.is_relative_to(ROOT.resolve()):
        raise ValueError(f"Evidence path escapes the project root: {relative_path}")
    if not source.is_file():
        raise FileNotFoundError(f"Capture source is missing: {relative_path}")
    expected = str(record.get("sha256", "")).lower()
    actual = sha256_file(source)
    if not expected or actual != expected:
        raise ValueError(
            f"Capture SHA-256 mismatch for {relative_path}: expected {expected}, got {actual}"
        )
    return source


def build_entry(
    clip_id: str,
    record: dict[str, Any],
    source: Path,
    output: Path,
    evidence_path: Path,
    evidence_sha: str,
    source_rule_hashes: dict[str, str],
    ffmpeg: Path,
) -> dict[str, Any]:
    duration = float(record["duration_seconds"])
    source_audio_duration = float(
        record.get("audio_analysis", {}).get("duration_seconds", duration)
    )
    delta = duration - source_audio_duration
    if delta > 0.005:
        audio_action = "pad_silence_to_original_video_duration"
    elif delta < -0.005:
        audio_action = "trim_audio_to_original_video_duration"
    else:
        audio_action = "trim_or_pad_audio_to_original_video_duration"

    if not output.exists():
        encode_clip(ffmpeg, source, output, duration)

    decoded = ffmpeg_stream_probe(ffmpeg, output)
    movie = mp4_movie_metadata(output)
    audio = decoded_audio_metrics(ffmpeg, output)
    tolerance = 1.0 / 30.0 + 0.002
    checks = {
        "h264": decoded["video_codec"] == "h264",
        "yuv420p": decoded["pixel_format"] == "yuv420p",
        "720_square": (decoded["width"], decoded["height"]) == (720, 720),
        "30_fps": abs(decoded["fps"] - 30.0) < 0.01,
        "aac": decoded["audio_codec"] == "aac",
        "48k_stereo": (
            decoded["audio_sample_rate_hz"] == 48000
            and decoded["audio_channels"] == 2
            and audio["channels"] == 2
        ),
        "full_decode": decoded["full_stream_decode_exit"] == 0,
        "faststart": movie["faststart_moov_before_mdat"],
        "video_duration_within_one_frame": (
            abs(movie["duration_seconds"] - duration) <= tolerance
        ),
        "audio_duration_within_one_frame": (
            abs(audio["decoded_duration_seconds"] - duration) <= tolerance
        ),
    }
    if not all(checks.values()):
        raise ValueError(
            f"Final output check failed for {output.name}: "
            + ", ".join(name for name, passed in checks.items() if not passed)
        )

    source_video = record.get("video", {})
    source_audio = record.get("audio_stream", {})
    source_audio_analysis = record.get("audio_analysis", {})
    description = DESCRIPTIONS.get(clip_id) or record.get("description")
    if not description:
        raise ValueError(
            f"No verified description for capture {clip_id}; pass --description "
            "for a newly accepted replacement capture."
        )
    return {
        "capture_id": clip_id,
        "description": description,
        "gameplay_provenance": GAMEPLAY_PROVENANCE,
        "source": {
            "path": rel(source),
            "sha256": sha256_file(source),
            "bytes": source.stat().st_size,
            "container": record.get("container"),
            "duration_seconds": duration,
            "video": {
                "codec": source_video.get("codec_id"),
                "width": source_video.get("width"),
                "height": source_video.get("height"),
            },
            "audio": {
                "codec": source_audio.get("codec_id"),
                "sample_rate_hz": source_audio.get("sample_rate_hz"),
                "channels": source_audio.get("channels"),
                "decoded_duration_seconds": source_audio_analysis.get("duration_seconds"),
                "peak_dbfs": source_audio_analysis.get("peak_dbfs"),
                "rms_dbfs": source_audio_analysis.get("rms_dbfs"),
                "clipped_sample_count_ge_0_999": source_audio_analysis.get(
                    "clipped_sample_count_ge_0_999"
                ),
                "coverage_ratio": source_audio_analysis.get("coverage_ratio"),
            },
        },
        "visual_description_evidence": {
            "contact_sheet": record.get("contact_sheet", {}).get("sheet", {}).get(
                "relative_path"
            ),
            "contact_sheet_sha256": record.get("contact_sheet", {}).get("sheet", {}).get(
                "sha256"
            ),
            "sample_timestamps_seconds": record.get("contact_sheet", {}).get(
                "timestamps_requested_seconds", []
            ),
            "description_basis": (
                "Contact-sheet frames decoded from this exact source SHA-256; "
                "description is limited to visible HUD/objective/result facts."
            ),
        },
        "output": {
            "path": rel(output),
            "sha256": sha256_file(output),
            "bytes": output.stat().st_size,
            "container": "MP4",
            "movie_duration_seconds": movie["duration_seconds"],
            "width": decoded["width"],
            "height": decoded["height"],
            "video_codec": decoded["video_codec"],
            "pixel_format": decoded["pixel_format"],
            "fps": decoded["fps"],
            "decoded_video_frames": decoded["decoded_video_frames"],
            "audio_codec": decoded["audio_codec"],
            "audio_sample_rate_hz": decoded["audio_sample_rate_hz"],
            "audio_channels": decoded["audio_channels"],
            "decoded_audio": audio,
            "faststart_moov_before_mdat": movie["faststart_moov_before_mdat"],
        },
        "processing": {
            "audio_policy": audio_action,
            "source_audio_to_video_delta_seconds": round(delta, 6),
            "audio_filter": (
                "aresample=48000:async=1:first_pts=0,apad,"
                f"atrim=duration={duration:.6f},asetpts=PTS-STARTPTS"
            ),
            "video_filter": (
                "fps=30; preserve full frame with scale-to-fit and black letterbox "
                "in 720x720; setsar=1; yuv420p"
            ),
            "encoding": {
                "video": "libx264, preset=fast, CRF=20, 30 fps, yuv420p",
                "audio": "AAC, 160 kbit/s, 48 kHz, stereo",
                "container": "MP4 with +faststart",
            },
            "no_music_narration_overlay_speed_edit_or_injected_win": True,
            "original_source_preserved": True,
        },
        "game_rules_evidence": {
            "qa_reference": "qa/full-play-r3.md",
            "current_at_pack_rule_source_hashes": source_rule_hashes,
            "hash_limit": (
                "Hashes identify source files at packaging time; media evidence "
                "says capture-time application revision was not assessed."
            ),
        },
        "objective_checks": checks,
        "evidence": {
            "raw_media_record": rel(evidence_path),
            "raw_media_record_sha256": evidence_sha,
        },
        "claim_limits": [
            "No subjective listening or speaker/headphone quality claim.",
            "No physical-device playback claim.",
            "Ordinary-input method is session-level QA evidence, not a frame-synchronized key log.",
        ],
    }


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--include",
        nargs="+",
        default=list(DEFAULT_INCLUDE),
        help="Explicit accepted capture IDs from the evidence file.",
    )
    parser.add_argument(
        "--evidence",
        type=Path,
        default=DEFAULT_EVIDENCE,
        help="Raw media QA JSON, relative to the project root by default.",
    )
    parser.add_argument(
        "--output-dir",
        type=Path,
        default=DEFAULT_OUTPUT_DIR,
        help="Output directory, relative to the project root by default.",
    )
    parser.add_argument(
        "--description",
        help="Required fallback description if an included new capture ID has none.",
    )
    args = parser.parse_args()
    evidence_path = args.evidence if args.evidence.is_absolute() else ROOT / args.evidence
    output_dir = args.output_dir if args.output_dir.is_absolute() else ROOT / args.output_dir
    evidence_path = evidence_path.resolve()
    output_dir = output_dir.resolve()
    if not evidence_path.is_relative_to(ROOT.resolve()):
        parser.error("--evidence must remain inside the App009 project root.")
    if not output_dir.is_relative_to(ROOT.resolve()):
        parser.error("--output-dir must remain inside the App009 project root.")
    if not evidence_path.is_file():
        parser.error(f"Evidence file not found: {evidence_path}")
    if not FFMPEG.is_file():
        parser.error(f"Bundled FFmpeg executable not found: {FFMPEG}")

    evidence, indexed = evidence_index(evidence_path)
    missing = [clip_id for clip_id in args.include if clip_id not in indexed]
    if missing:
        parser.error(
            "Selected capture IDs are not present in the raw evidence: "
            + ", ".join(missing)
        )
    try:
        output_dir.mkdir(parents=True, exist_ok=True)
        manifest_path = ROOT / "marketing" / "clips.json"
        if manifest_path.exists():
            manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
        else:
            manifest = {
                "schema_version": 1,
                "clips": [],
            }
        previous = {
            str(item.get("capture_id")): item
            for item in manifest.get("clips", [])
            if isinstance(item, dict)
        }
        rule_files = (
            ROOT / "src" / "product" / "kiln-model.js",
            ROOT / "src" / "product" / "kiln-game.js",
        )
        rule_hashes = {rel(path): sha256_file(path) for path in rule_files if path.is_file()}
        evidence_sha = sha256_file(evidence_path)
        updated = dict(previous)
        for clip_id in args.include:
            record = indexed[clip_id]
            source = capture_source(record, evidence_path)
            stem = source.stem
            output = output_dir / f"{stem}.mp4"
            if clip_id not in DESCRIPTIONS and args.description:
                record = dict(record)
                record["description"] = args.description
            if output.exists():
                prior = previous.get(clip_id, {})
                if (
                    prior.get("source", {}).get("sha256") != sha256_file(source)
                    or prior.get("output", {}).get("sha256") != sha256_file(output)
                ):
                    raise FileExistsError(
                        f"Existing output does not match manifest; refusing overwrite: {rel(output)}"
                    )
            entry = build_entry(
                clip_id,
                record,
                source,
                output,
                evidence_path,
                evidence_sha,
                rule_hashes,
                FFMPEG,
            )
            updated[clip_id] = entry
            print(
                f"PACKED {clip_id} source_sha256={entry['source']['sha256']} "
                f"output={entry['output']['path']} output_sha256={entry['output']['sha256']} "
                f"duration={entry['output']['movie_duration_seconds']:.3f}s "
                f"peak={entry['output']['decoded_audio']['peak_dbfs']:.2f}dBFS "
                f"clipped={entry['output']['decoded_audio']['clipped_sample_count_ge_0_999']}"
            )

        manifest = {
            "schema_version": 1,
            "generated_at_utc": dt.datetime.now(dt.timezone.utc).isoformat(),
            "preserved_failed_attempts": PRESERVED_FAILED_ATTEMPTS,
            "source_evidence": {
                "path": rel(evidence_path),
                "sha256": evidence_sha,
                "scope": evidence.get("scope"),
                "application_source_revision": evidence.get("claimsBoundary", {}).get(
                    "application_source_revision",
                    evidence.get("claims_boundary", {}).get("application_source_revision"),
                ),
            },
            "format_policy": {
                "container": "MP4",
                "video": {
                    "codec": "H.264/libx264",
                    "pixel_format": "yuv420p",
                    "width": 720,
                    "height": 720,
                    "fps": 30,
                    "framing": "Full source frame scaled to fit; black letterbox; no crop.",
                },
                "audio": {
                    "codec": "AAC",
                    "sample_rate_hz": 48000,
                    "channels": 2,
                    "policy": "Pad silence or trim captured audio to original video duration.",
                },
                "faststart": True,
                "music": False,
                "narration": False,
                "overlays": False,
                "speed_edits": False,
                "injected_wins": False,
            },
            "clips": [updated[key] for key in sorted(updated)],
        }
        temporary_manifest = manifest_path.with_name("clips.json.partial")
        if temporary_manifest.exists():
            raise FileExistsError(
                f"Refusing to overwrite prior partial manifest: {rel(temporary_manifest)}"
            )
        temporary_manifest.write_text(
            json.dumps(manifest, ensure_ascii=False, indent=2) + "\n",
            encoding="utf-8",
        )
        temporary_manifest.replace(manifest_path)
        print(f"MANIFEST {rel(manifest_path)} entries={len(manifest['clips'])}")
        return 0
    except Exception as error:
        print(f"MEDIA_PACK_FAILED {type(error).__name__}: {error}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
