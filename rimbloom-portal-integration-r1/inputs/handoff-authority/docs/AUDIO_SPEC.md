# Audio contract

原創のWeb Audio oscillator合成。外部音声asset・BGM・TTSなし、microphone permission不要。初回Play/pointer/key/sound controlのuser gestureでAudioContext/WebKit fallbackを作りresume。失敗・不在時は音なしでGameplay継続。

MASTER_GAIN=0.22、最大10 voices、attack 8ms、recipe長+20msでnode停止。voice優先度でdamage/resultを保護。gain→soft WaveShaper→destination、同じshaper→dev capture destination。最終録画の最大peakは−11.032468dB。特定phone speakerの実聴PASSではない。

| Cue | 合成 / 長さ |
|---|---|
| launch/dash | sawtooth 240→80Hz / 0.11s |
| bounce/bank | sine 740→1100Hz / 0.15s |
| armor block | triangle 135→78Hz / 0.10s |
| armor break | triangle 320→120Hz / .09s + quiet square 1280→660Hz / .065s |
| enemy break | triangle (420+clamped chain×95)→150Hz / .12s |
| chain milestone | 3/5/8/12 pitch band、二層sine、0.115→0.082s |
| damage | sine 100→42Hz / .21s |
| wave | sine 380→650Hz / .26s |
| result | triangle 440→880Hz / .4s |

chain countの音程は12でcap。18chainのvisual milestoneも12音程band。音量、timing、voice limitを勝手に再調整しない。声をstop/muteした時はgain/nodeを即時停止・disconnect。pause、hidden/blurでsound.stop()。戻った時の自動音や予約発射を入れない。

sound toggleはruntime memoryのみで保存しない。Portal側のglobal muteがある場合は同意/設定と衝突しないadapterを後続candidateで設計。Accepted sourceのSound API: unlock(), play(type,chain), stop(), mute(value)、ctx/master/capture/muted。公開previewはcapture serverを含まない。
