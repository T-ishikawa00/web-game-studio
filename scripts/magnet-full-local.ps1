param([switch]$Stop)
$ErrorActionPreference='Stop'
$root='C:\projects\Web Game Studio'
if((Get-Location).Path -ne $root){throw 'Exact workspace required'}
$state=Join-Path $root '.tmp\magnet-full-r1\server.json'
if($Stop){
 if(Test-Path -LiteralPath $state){$server=Get-Content -LiteralPath $state -Raw|ConvertFrom-Json;$process=Get-CimInstance Win32_Process -Filter "ProcessId=$($server.pid)";if($process -and $process.CommandLine -match 'scripts[\\/]magnet-full-server\.mjs'){Stop-Process -Id $server.pid;Write-Output 'Full game preview stopped'}else{Write-Output 'Recorded preview is not running; no process stopped'}}
 exit
}
if(Get-NetTCPConnection -State Listen -LocalPort 4371 -ErrorAction SilentlyContinue){throw 'Port 4371 occupied; existing process preserved'}
node scripts/magnet-full-build.mjs
if($LASTEXITCODE -ne 0){throw 'Build failed'}
New-Item -ItemType Directory -Force (Join-Path $root '.tmp\magnet-full-r1')|Out-Null
Start-Process -FilePath (Get-Command node).Source -ArgumentList 'scripts/magnet-full-server.mjs' -WorkingDirectory $root -WindowStyle Hidden -RedirectStandardOutput '.tmp/magnet-full-r1/server.stdout.log' -RedirectStandardError '.tmp/magnet-full-r1/server.stderr.log'
Write-Output 'http://127.0.0.1:4371/review/'
