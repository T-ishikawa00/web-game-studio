$ErrorActionPreference = 'Stop'
$trustRoot = 'C:\projects\Web Game Studio'
if ((Get-Location).Path -ne $trustRoot) { throw 'Wrong workspace' }
$trustInfo = Get-Content -LiteralPath "$trustRoot\docs\qa\tinlumo-trust-ux-r2\server.json" | ConvertFrom-Json
$trustProcess = Get-CimInstance Win32_Process -Filter "ProcessId=$($trustInfo.pid)"
if ($trustProcess) {
 if ($trustProcess.CommandLine -notlike '*tinlumo-trust-ux-r2/server.mjs*' -or [math]::Abs(($trustProcess.CreationDate.ToUniversalTime() - ([datetime]$trustInfo.startedAt).ToUniversalTime()).TotalSeconds) -gt 15) { throw 'Process identity changed; refusing to stop' }
 Stop-Process -Id $trustInfo.pid
}
Start-Process -FilePath node -ArgumentList 'docs/qa/tinlumo-trust-ux-r2/server.mjs' -WorkingDirectory $trustRoot -WindowStyle Hidden -RedirectStandardOutput "$trustRoot\.tmp\trust-ux-r2\server.log" -RedirectStandardError "$trustRoot\.tmp\trust-ux-r2\server-error.log"
