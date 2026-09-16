param([ValidateSet('preview','review','both')][string]$Target='both')
$rcRoot = 'C:\projects\Web Game Studio'
if ((Get-Location).Path -ne $rcRoot) { throw 'Run from Web Game Studio' }
$rcTargets = if ($Target -eq 'both') { @('preview','review') } else { @($Target) }
foreach ($rcTarget in $rcTargets) {
  $rcRecordPath = Join-Path $rcRoot ".tmp\rc\$rcTarget-process.json"
  if (!(Test-Path -LiteralPath $rcRecordPath)) { continue }
  $rcRecord = Get-Content -LiteralPath $rcRecordPath -Raw | ConvertFrom-Json
  $rcProcess = Get-CimInstance Win32_Process -Filter "ProcessId=$($rcRecord.pid)"
  if (!$rcProcess) { continue }
  $rcExpectedPort = if ($rcTarget -eq 'preview') { 4350 } else { 4351 }
  if ($rcRecord.port -ne $rcExpectedPort -or $rcProcess.CommandLine -notmatch 'scripts[/\\]rc-server\.mjs') { throw 'Process identity mismatch; no process stopped' }
  $rcListener = Get-NetTCPConnection -State Listen -LocalPort $rcExpectedPort -ErrorAction SilentlyContinue
  if (!$rcListener -or $rcListener.OwningProcess -ne $rcRecord.pid -or $rcListener.LocalAddress -ne '127.0.0.1') { throw 'Listener identity mismatch; no process stopped' }
  Stop-Process -Id $rcRecord.pid
  Write-Output "Stopped this RC $rcTarget process."
}
