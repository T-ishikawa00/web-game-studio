$ErrorActionPreference='Stop'
if((Get-Location).Path -ne 'C:\projects\Web Game Studio'){throw 'Run from the project root'}
$taskInfo=Get-Content -LiteralPath 'game005-island/r3-2/.cache/server.json' -Raw | ConvertFrom-Json
$taskProc=Get-CimInstance Win32_Process -Filter "ProcessId=$($taskInfo.pid)"
if(-not $taskProc){Write-Output 'R3.2 server already stopped';exit 0}
if($taskProc.Name -ne 'node.exe' -or $taskProc.CommandLine -notlike '*game005-island/r3-2/scripts/server.mjs*'){throw 'PID identity changed; nothing stopped'}
if([Math]::Abs((([datetime]$taskProc.CreationDate).ToUniversalTime()-([datetime]$taskInfo.startedAt).ToUniversalTime()).TotalSeconds) -gt 10){throw 'Start time mismatch; nothing stopped'}
$taskListen=Get-NetTCPConnection -State Listen -LocalPort $taskInfo.port -ErrorAction SilentlyContinue
if($taskListen -and ($taskListen.OwningProcess -ne $taskInfo.pid -or $taskListen.LocalAddress -ne '127.0.0.1')){throw 'Listener mismatch; nothing stopped'}
Stop-Process -Id $taskInfo.pid
Write-Output "Stopped R3.2 loopback server PID $($taskInfo.pid)"

