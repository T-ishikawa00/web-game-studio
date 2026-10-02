#!/usr/bin/env python3
"""Inspect completed Game009 WebM captures without changing the originals.

Run with the bundled Python runtime, for example:
  python tools/media-qa.py

The tool writes qa/media-evidence.json and a local native-video review page.
It requires ffmpeg on PATH, or the temporary ignored .media-tools install.
"""

from __future__ import annotations

import datetime as dt
import hashlib
import json
import math
import re
import shutil
import struct
import subprocess
import sys
from pathlib import Path
from typing import Iterator


ROOT = Path(__file__).resolve().parents[1]
CAPTURE_DIR = ROOT / "qa" / "captures"
EVIDENCE_PATH = ROOT / "qa" / "media-evidence.json"
VIEWER_PATH = ROOT / "qa" / "video-review.html"
CONTACT_DIR = ROOT / "qa" / "contact-sheets"
WINDOW_SECONDS = 0.1
SILENCE_DBFS = -60.0
CLIPPING_LINEAR = 0.999
FRAME_TIMESTAMPS = [0, 3, 6, 9, 12, 15]


class MediaError(RuntimeError):
    pass


def find_ffmpeg() -> Path:
    installed = shutil.which("ffmpeg")
    if installed:
        return Path(installed)
    local_bins = ROOT / ".media-tools" / "imageio_ffmpeg" / "binaries"
    for candidate in sorted(local_bins.glob("ffmpeg*.exe")):
        return candidate
    for candidate in sorted(local_bins.glob("ffmpeg*")):
        if candidate.is_file():
            return candidate
    raise MediaError("ffmpeg unavailable (checked PATH and ignored .media-tools install)")


def run_ffmpeg(executable: Path, args: list[str], *, timeout: int = 300) -> subprocess.CompletedProcess[bytes]:
    return subprocess.run(
        [str(executable), *args],
        cwd=ROOT,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        timeout=timeout,
        check=False,
    )


def vint(data: bytes, pos: int, *, element_id: bool = False) -> tuple[int, int]:
    if pos >= len(data):
        raise MediaError("unexpected end of WebM while reading EBML integer")
    first = data[pos]
    if first == 0:
        raise MediaError("invalid EBML variable-length integer")
    width = 1
    marker = 0x80
    while not first & marker:
        width += 1
        marker >>= 1
        if width > 8:
            raise MediaError("invalid EBML integer width")
    if pos + width > len(data):
        raise MediaError("truncated EBML variable-length integer")
    value = first if element_id else first & (marker - 1)
    for byte in data[pos + 1 : pos + width]:
        value = (value << 8) | byte
    unknown = not element_id and value == (1 << (7 * width)) - 1
    return value, width if not unknown else -width


def children(data: bytes, start: int, end: int) -> Iterator[tuple[int, int, int]]:
    pos = start
    while pos < end:
        element_id, id_width = vint(data, pos, element_id=True)
        size, size_width = vint(data, pos + id_width)
        if size_width < 0:
            payload_end = end
        else:
            payload_end = pos + id_width + size_width + size
            if payload_end > end:
                raise MediaError(f"EBML element 0x{element_id:x} exceeds parent boundary")
        payload_start = pos + id_width + abs(size_width)
        yield element_id, payload_start, payload_end
        if payload_end <= pos:
            raise MediaError("invalid EBML element boundary")
        pos = payload_end


def unsigned(data: bytes, start: int, end: int) -> int:
    return int.from_bytes(data[start:end], "big", signed=False)


def ebml_float(data: bytes, start: int, end: int) -> float:
    raw = data[start:end]
    if len(raw) == 4:
        return struct.unpack(">f", raw)[0]
    if len(raw) == 8:
        return struct.unpack(">d", raw)[0]
    raise MediaError("invalid EBML floating-point width")


def text(data: bytes, start: int, end: int) -> str:
    return data[start:end].decode("utf-8", errors="replace")


def parse_track(data: bytes, start: int, end: int) -> dict:
    track: dict = {"type": "unknown"}
    for element_id, a, b in children(data, start, end):
        if element_id == 0x83:
            track_type = unsigned(data, a, b)
            track["type"] = {1: "video", 2: "audio", 3: "complex", 17: "subtitle"}.get(track_type, str(track_type))
        elif element_id == 0x86:
            track["codec_id"] = text(data, a, b)
        elif element_id == 0xE0:
            video: dict = {}
            for child_id, x, y in children(data, a, b):
                if child_id == 0xB0:
                    video["width"] = unsigned(data, x, y)
                elif child_id == 0xBA:
                    video["height"] = unsigned(data, x, y)
            track["video"] = video
        elif element_id == 0xE1:
            audio: dict = {}
            for child_id, x, y in children(data, a, b):
                if child_id == 0xB5:
                    audio["sample_rate_hz"] = ebml_float(data, x, y)
                elif child_id == 0x9F:
                    audio["channels"] = unsigned(data, x, y)
                elif child_id == 0x6264:
                    audio["bit_depth"] = unsigned(data, x, y)
            track["audio"] = audio
    return track


def parse_webm(path: Path) -> dict:
    data = path.read_bytes()
    if data[:4] != bytes.fromhex("1a45dfa3"):
        raise MediaError(f"not an EBML/WebM file: {path.name}")
    result: dict = {"tracks": []}
    timestamp_scale = 1_000_000
    segment: tuple[int, int] | None = None
    for element_id, a, b in children(data, 0, len(data)):
        if element_id == 0x18538067:
            segment = (a, b)
            break
    if segment is None:
        raise MediaError("EBML Segment is missing")
    for element_id, a, b in children(data, *segment):
        if element_id == 0x1549A966:
            for child_id, x, y in children(data, a, b):
                if child_id == 0x2AD7B1:
                    timestamp_scale = unsigned(data, x, y)
                elif child_id == 0x4489:
                    result["duration_seconds"] = ebml_float(data, x, y) * timestamp_scale / 1_000_000_000
        elif element_id == 0x1654AE6B:
            for child_id, x, y in children(data, a, b):
                if child_id == 0xAE:
                    result["tracks"].append(parse_track(data, x, y))
    video = next((t for t in result["tracks"] if t["type"] == "video"), None)
    audio = next((t for t in result["tracks"] if t["type"] == "audio"), None)
    if video:
        result["video"] = {"codec_id": video.get("codec_id"), **video.get("video", {})}
    if audio:
        result["audio_stream"] = {"codec_id": audio.get("codec_id"), **audio.get("audio", {})}
        result["audio_stream"].setdefault("sample_rate_hz", 48000)
        result["audio_stream"].setdefault("channels", 1)
    result.pop("tracks", None)
    return result


def rms_dbfs(sum_squares: float, count: int) -> float:
    if count == 0 or sum_squares <= 0:
        return -120.0
    return 20.0 * math.log10(math.sqrt(sum_squares / count))


def analyze_audio(executable: Path, path: Path, sample_rate: int, channels: int) -> dict:
    command = [
        str(executable), "-hide_banner", "-v", "error", "-i", str(path),
        "-map", "0:a:0", "-af", "aresample=async=1:first_pts=0",
        "-acodec", "pcm_f32le", "-f", "f32le", "pipe:1",
    ]
    proc = subprocess.Popen(command, cwd=ROOT, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    try:
        pcm, stderr = proc.communicate(timeout=300)
    except subprocess.TimeoutExpired:
        proc.kill()
        proc.communicate()
        raise MediaError(f"audio decode timed out for {path.name}")
    if proc.returncode != 0:
        raise MediaError(f"audio decode failed for {path.name}: {stderr.decode(errors='replace')[-1000:]}")
    if len(pcm) % (4 * channels):
        raise MediaError(f"decoded audio ended mid-sample: {stderr.decode(errors='replace')[-500:]}")
    frame_window = max(1, round(sample_rate * WINDOW_SECONDS))
    sample_window = frame_window * channels
    windows: list[dict] = []
    total_samples = 0
    total_sq = 0.0
    peak = 0.0
    min_sample = 1.0
    max_sample = -1.0
    clipped = 0
    frame_offset = 0
    for start in range(0, len(pcm), sample_window * 4):
        block = pcm[start : start + sample_window * 4]
        block_sum = 0.0
        block_peak = 0.0
        block_count = len(block) // 4
        for (sample,) in struct.iter_unpack("<f", block):
            magnitude = abs(sample)
            block_sum += sample * sample
            if magnitude > block_peak:
                block_peak = magnitude
            if magnitude > peak:
                peak = magnitude
            if sample < min_sample:
                min_sample = sample
            if sample > max_sample:
                max_sample = sample
            if magnitude >= CLIPPING_LINEAR:
                clipped += 1
        frames = block_count // channels
        db = rms_dbfs(block_sum, block_count)
        windows.append({
            "start_seconds": round(frame_offset / sample_rate, 3),
            "duration_seconds": round(frames / sample_rate, 3),
            "rms_dbfs": round(db, 2),
            "peak_dbfs": round(20.0 * math.log10(max(block_peak, 1e-12)), 2),
            "below_minus_60_dbfs": db < SILENCE_DBFS,
        })
        frame_offset += frames
        total_samples += block_count
        total_sq += block_sum
    if total_samples == 0:
        raise MediaError(f"audio stream decoded no samples: {path.name}")
    peak_db = 20.0 * math.log10(max(peak, 1e-12))
    silent_duration = sum(w["duration_seconds"] for w in windows if w["below_minus_60_dbfs"])
    return {
        "decoded_samples": total_samples,
        "decoded_frames": frame_offset,
        "duration_seconds": round(frame_offset / sample_rate, 3),
        "sample_rate_hz": sample_rate,
        "channels": channels,
        "peak_linear": round(peak, 7),
        "peak_dbfs": round(peak_db, 2),
        "rms_dbfs": round(rms_dbfs(total_sq, total_samples), 2),
        "min_sample": round(min_sample, 7),
        "max_sample": round(max_sample, 7),
        "clipped_sample_count_ge_0_999": clipped,
        "clipping_threshold_linear": CLIPPING_LINEAR,
        "silence_threshold_dbfs": SILENCE_DBFS,
        "window_seconds": WINDOW_SECONDS,
        "windows_100ms": windows,
        "below_threshold_duration_seconds": round(silent_duration, 3),
        "below_threshold_fraction": round(silent_duration / (frame_offset / sample_rate), 4),
    }


def decode_video(executable: Path, path: Path) -> dict:
    result = run_ffmpeg(executable, [
        "-hide_banner", "-v", "error", "-i", str(path),
        "-map", "0:v:0", "-f", "null", "-",
    ])
    if result.returncode != 0:
        raise MediaError(f"video decode failed for {path.name}: {result.stderr.decode(errors='replace')[-1000:]}")
    return {"decoded": True, "stderr": result.stderr.decode(errors="replace").strip()}


def file_sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as stream:
        while chunk := stream.read(1024 * 1024):
            digest.update(chunk)
    return digest.hexdigest()


def png_dimensions(path: Path) -> tuple[int, int]:
    with path.open("rb") as stream:
        header = stream.read(24)
    if len(header) != 24 or header[:8] != bytes.fromhex("89504e470d0a1a0a") or header[12:16] != b"IHDR":
        raise MediaError(f"invalid PNG output: {path.name}")
    return struct.unpack(">II", header[16:24])


def generate_contact_sheet(executable: Path, path: Path, source_sha256: str, duration: float) -> dict:
    stamps = [stamp for stamp in FRAME_TIMESTAMPS if stamp < duration]
    if not stamps:
        raise MediaError(f"clip is too short for requested contact-sheet samples: {path.name}")
    CONTACT_DIR.mkdir(parents=True, exist_ok=True)
    stem = f"{path.stem}-{source_sha256[:12]}"
    pattern = CONTACT_DIR / f"{stem}-t%02d.png"
    extraction = run_ffmpeg(executable, [
        "-hide_banner", "-v", "error", "-i", str(path),
        "-vf", "fps=fps=1/3:round=near", "-frames:v", str(len(stamps)),
        "-start_number", "0", "-vsync", "0", "-y", str(pattern),
    ])
    if extraction.returncode != 0:
        raise MediaError(f"sample-frame extraction failed for {path.name}: {extraction.stderr.decode(errors='replace')[-1000:]}")
    frames = []
    for index, timestamp in enumerate(stamps):
        frame_path = CONTACT_DIR / f"{stem}-t{index:02d}.png"
        if not frame_path.exists():
            raise MediaError(f"sample frame missing at {timestamp}s for {path.name}")
        width, height = png_dimensions(frame_path)
        frames.append({
            "timestamp_seconds": timestamp,
            "relative_path": frame_path.relative_to(ROOT).as_posix(),
            "bytes": frame_path.stat().st_size,
            "sha256": file_sha256(frame_path),
            "width": width,
            "height": height,
        })
    sheet_path = CONTACT_DIR / f"{stem}-sheet.png"
    sheet = run_ffmpeg(executable, [
        "-hide_banner", "-v", "error", "-framerate", "1", "-start_number", "0",
        "-i", str(CONTACT_DIR / f"{stem}-t%02d.png"),
        "-vf", "scale=360:360:force_original_aspect_ratio=decrease,pad=360:360:(ow-iw)/2:(oh-ih)/2:color=0x091016,tile=3x2:nb_frames=6:padding=8:margin=8:color=0x091016",
        "-frames:v", "1", "-y", str(sheet_path),
    ])
    if sheet.returncode != 0:
        raise MediaError(f"contact-sheet layout failed for {path.name}: {sheet.stderr.decode(errors='replace')[-1000:]}")
    sheet_width, sheet_height = png_dimensions(sheet_path)
    return {
        "purpose": "QA contact sheet derived from decoded source frames; not a marketing mockup.",
        "source_file": path.relative_to(ROOT).as_posix(),
        "source_sha256": source_sha256,
        "sampling_method": "FFmpeg fps filter at a 3-second interval, starting at the first decoded frame; originals are preserved.",
        "timestamps_requested_seconds": stamps,
        "layout_order": "left-to-right then top-to-bottom",
        "frames": frames,
        "sheet": {
            "relative_path": sheet_path.relative_to(ROOT).as_posix(),
            "bytes": sheet_path.stat().st_size,
            "sha256": file_sha256(sheet_path),
            "width": sheet_width,
            "height": sheet_height,
        },
    }


def ffmpeg_facts(executable: Path) -> dict:
    version = run_ffmpeg(executable, ["-version"])
    license_result = run_ffmpeg(executable, ["-L"])
    first_line = version.stdout.decode(errors="replace").splitlines()[0] if version.stdout else "unknown"
    full_license = (version.stdout + license_result.stdout + license_result.stderr).decode(errors="replace")
    configure = next((line.strip() for line in full_license.splitlines() if "configuration:" in line), "")
    license_name = "GPLv3-or-later" if "--enable-gpl" in configure and "--enable-version3" in configure else "see-ffmpeg-L-output"
    wrapper_version = None
    wrapper_license = None
    metadata = ROOT / ".media-tools" / "imageio_ffmpeg-0.6.0.dist-info" / "METADATA"
    if metadata.exists():
        raw = metadata.read_text(encoding="utf-8", errors="replace")
        wrapper_version = re.search(r"(?m)^Version: (.+)$", raw).group(1) if re.search(r"(?m)^Version: (.+)$", raw) else None
        wrapper_license = re.search(r"(?m)^License: (.+)$", raw).group(1) if re.search(r"(?m)^License: (.+)$", raw) else None
    return {
        "executable_path_relative": str(executable.relative_to(ROOT)) if executable.is_relative_to(ROOT) else str(executable),
        "version": first_line,
        "license_classification_from_build_flags": license_name,
        "configuration": configure,
        "wrapper": {"name": "imageio-ffmpeg", "version": wrapper_version, "declared_license": wrapper_license},
        "license_sources": {
            "wrapper": "https://pypi.org/project/imageio-ffmpeg/",
            "ffmpeg": "https://ffmpeg.org/legal.html",
        },
        "distribution_note": "Local QA utility only; ffmpeg executable and wrapper are excluded from the game build and release pack.",
    }


def analyze_clip(executable: Path, path: Path) -> dict:
    source_hash = file_sha256(path)
    container = parse_webm(path)
    video = container.get("video")
    if not video or not video.get("width") or not video.get("height"):
        raise MediaError(f"video dimensions unavailable: {path.name}")
    video_decode = decode_video(executable, path)
    contact_sheet = generate_contact_sheet(executable, path, source_hash, container.get("duration_seconds", 0))
    audio_stream = container.get("audio_stream")
    audio_result = None
    if audio_stream:
        audio_result = analyze_audio(executable, path, int(round(audio_stream["sample_rate_hz"])), int(audio_stream["channels"]))
        audio_result["video_duration_seconds"] = round(container.get("duration_seconds", 0), 3)
        audio_result["duration_shortfall_seconds"] = round(max(0, container.get("duration_seconds", 0) - audio_result["duration_seconds"]), 3)
        audio_result["coverage_ratio"] = round(min(1, audio_result["duration_seconds"] / container["duration_seconds"]), 4) if container.get("duration_seconds", 0) else None
        audio_result["covers_at_least_98_percent_of_video"] = bool(audio_result["coverage_ratio"] is not None and audio_result["coverage_ratio"] >= 0.98)
    stat = path.stat()
    return {
        "file": path.name,
        "relative_path": path.relative_to(ROOT).as_posix(),
        "bytes": stat.st_size,
        "sha256": source_hash,
        "container": "WebM/EBML",
        "duration_seconds": round(container.get("duration_seconds", 0), 3),
        "video": video,
        "video_decode": video_decode,
        "audio_stream": audio_stream,
        "audio_analysis": audio_result,
        "contact_sheet": contact_sheet,
        "claims_boundary": "Digital decode and signal measurements only; no subjective listening or playback quality pass is implied.",
    }


def html_escape(value: object) -> str:
    return (str(value).replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
            .replace('"', "&quot;").replace("'", "&#39;"))


def viewer_html(evidence: dict) -> str:
    cards = []
    for clip in evidence["clips"]:
        audio = clip.get("audio_analysis")
        audio_summary = "No audio track" if audio is None else (
            f"Track {audio['duration_seconds']:.2f}s / {audio['video_duration_seconds']:.2f}s video "
            f"({audio['coverage_ratio'] * 100:.1f}% coverage; {audio['duration_shortfall_seconds']:.2f}s short) · "
            f"peak {audio['peak_dbfs']} dBFS · {audio['clipped_sample_count_ge_0_999']} samples ≥ 0.999 · "
            f"{audio['below_threshold_fraction'] * 100:.1f}% below −60 dBFS"
        )
        cards.append(f"""
        <article class="clip">
          <h2>{html_escape(clip['file'])}</h2>
          <video controls preload="metadata" playsinline src="../{html_escape(clip['relative_path'])}"></video>
          <a class="sheet-link" href="../{html_escape(clip['contact_sheet']['sheet']['relative_path'])}" target="_blank" rel="noreferrer">
            <img class="sheet" loading="lazy" src="../{html_escape(clip['contact_sheet']['sheet']['relative_path'])}" alt="QA contact sheet sampled at {', '.join(str(t) for t in clip['contact_sheet']['timestamps_requested_seconds'])} seconds">
          </a>
          <p class="facts">Contact sheet · six decoded samples, 0–15 s. Individual frames:</p>
          <p class="frame-links">{' · '.join(f'<a href="../{html_escape(frame["relative_path"])}" target="_blank" rel="noreferrer">{frame["timestamp_seconds"]} s</a>' for frame in clip['contact_sheet']['frames'])}</p>
          <p class="facts">{clip['video']['width']} × {clip['video']['height']} · {clip['duration_seconds']:.2f} s · {html_escape(clip['video'].get('codec_id', 'video'))}</p>
          <p class="facts">{html_escape(audio_summary)}</p>
          <details><summary>Source identity</summary><code>SHA-256 {html_escape(clip['sha256'])}</code></details>
        </article>
        """)
    empty = '<p class="empty">No completed WebM captures are present in <code>qa/captures</code>.</p>'
    cards_markup = "\n".join(cards) if cards else empty
    return f"""<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Game009 · Capture review</title>
<style>
:root{{color-scheme:dark;--bg:#091016;--panel:#111e26;--line:#29404a;--text:#e4eeeb;--muted:#a3b8b5;--mint:#9de1c3}}
*{{box-sizing:border-box}}body{{margin:0;background:radial-gradient(circle at 80% -15%,#1a3440 0,transparent 42%),var(--bg);color:var(--text);font:16px/1.5 system-ui,sans-serif}}
main{{max-width:1100px;margin:auto;padding:32px 20px 56px}}h1{{font-size:clamp(1.7rem,4vw,2.5rem);line-height:1.1;margin:0 0 8px}}.sub,.fine{{color:var(--muted)}}.grid{{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,460px),1fr));gap:18px;margin-top:26px}}.clip{{background:linear-gradient(145deg,#15242b,var(--panel));border:1px solid var(--line);border-radius:18px;padding:16px;min-width:0}}h2{{font-size:1rem;word-break:break-all;margin:0 0 12px;color:var(--mint)}}video{{display:block;background:#020507;width:100%;aspect-ratio:16/10;object-fit:contain;border-radius:10px}}.sheet-link{{display:block;margin-top:12px}}.sheet{{display:block;width:100%;height:auto;border:1px solid var(--line);border-radius:8px}}.facts{{font-size:.9rem;color:#cfddda;margin:10px 0 0}}.frame-links{{margin:2px 0;color:var(--mint);font-size:.88rem}}a{{color:var(--mint)}}details{{margin-top:10px;color:var(--muted);font-size:.85rem}}code{{overflow-wrap:anywhere}}.note{{margin-top:24px;padding:14px 16px;border-left:3px solid var(--mint);background:#122029;border-radius:0 10px 10px 0}}.empty{{color:var(--muted)}}
</style></head><body><main>
<h1>Game009 · Capture review</h1>
<p class="sub">{len(evidence['clips'])} completed recording(s) · generated {html_escape(evidence['generated_at_utc'])}</p>
<section class="grid">{cards_markup}</section>
<p class="note">Use each video’s native controls for normal playback and seeking. Measurements describe decoded samples and frames only; they do not establish subjective sound quality. Original WebM files remain unchanged.</p>
<p class="fine">Standalone local QA page. The recordings currently listed here are the files available in <code>qa/captures</code> when this report was generated.</p>
</main></body></html>"""


def main() -> int:
    executable = find_ffmpeg()
    clips = []
    errors = []
    for path in sorted(CAPTURE_DIR.glob("*.webm")):
        try:
            clips.append(analyze_clip(executable, path))
        except Exception as exc:  # preserve each failed capture as a visible QA finding
            errors.append({"file": path.name, "error": f"{type(exc).__name__}: {exc}"})
    now = dt.datetime.now(dt.timezone.utc).isoformat(timespec="seconds").replace("+00:00", "Z")
    report = {
        "schema_version": 1,
        "generated_at_utc": now,
        "capture_scope": "Every completed qa/captures/*.webm present at report time",
        "capture_count": len(clips) + len(errors),
        "analyzed_count": len(clips),
        "failed_analysis_count": len(errors),
        "tooling": ffmpeg_facts(executable),
        "analysis_method": {
            "video": "Full video stream decoded to ffmpeg null muxer; source dimensions and duration parsed from EBML metadata.",
            "audio": "Original audio stream decoded to float PCM at the stream rate and channels; unweighted digital sample peak, RMS, thresholded clipped-sample count, and 100 ms RMS windows measured.",
            "silence_definition": f"100 ms window RMS below {SILENCE_DBFS} dBFS.",
            "clipping_definition": f"Absolute digital sample value greater than or equal to {CLIPPING_LINEAR}.",
            "subjective_listening": False,
            "physical_device_playback": False,
            "source_files_modified": False,
            "application_source_revision": "Not assessed. This report describes only the captured WebM streams and their decoded samples.",
            "contact_sheets": "For each analyzed video, decoded full-resolution PNG samples are saved at 0, 3, 6, 9, 12 and 15 seconds when available. A 3x2 resized derivative is for QA review; original WebM hashes and sample-frame hashes are recorded.",
        },
        "clips": clips,
        "errors": errors,
    }
    EVIDENCE_PATH.parent.mkdir(parents=True, exist_ok=True)
    if EVIDENCE_PATH.exists():
        previous = EVIDENCE_PATH.read_bytes()
        try:
            previous_stamp = json.loads(previous).get("generated_at_utc", "unknown")
        except (UnicodeDecodeError, json.JSONDecodeError):
            previous_stamp = "unparsed"
        stamp = re.sub(r"[^0-9TZ]", "", str(previous_stamp)) or "unknown"
        archive_path = EVIDENCE_PATH.with_name(f"media-evidence-prev-{stamp}.json")
        suffix = 2
        while archive_path.exists() and archive_path.read_bytes() != previous:
            archive_path = EVIDENCE_PATH.with_name(f"media-evidence-prev-{stamp}-{suffix:02d}.json")
            suffix += 1
        if not archive_path.exists():
            archive_path.write_bytes(previous)
    EVIDENCE_PATH.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    VIEWER_PATH.write_text(viewer_html(report), encoding="utf-8")
    print(json.dumps({"report": str(EVIDENCE_PATH), "viewer": str(VIEWER_PATH), "clips": len(clips), "errors": errors}, ensure_ascii=False, indent=2))
    return 1 if errors else 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except MediaError as exc:
        print(f"media QA failed: {exc}", file=sys.stderr)
        raise SystemExit(2)
