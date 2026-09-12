$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location -LiteralPath $projectRoot
if ((git rev-parse --show-toplevel).Trim().Replace('/', '\') -ine $projectRoot) { throw 'Repository root mismatch' }
if ($env:PROCESSOR_ARCHITECTURE -ne 'AMD64') { throw 'This installer supports Windows x64; see SECURITY.md for other platforms.' }
$existingHooks = git config --local --get core.hooksPath
if ($existingHooks -and $existingHooks -ne '.githooks') { throw 'Existing hook configuration requires review; not overwritten.' }
$toolDir = Join-Path $projectRoot '.cache/tools/gitleaks/8.30.1'
New-Item -ItemType Directory -Force $toolDir | Out-Null
$archivePath = Join-Path $toolDir 'gitleaks.zip'
if (!(Test-Path -LiteralPath $archivePath)) {
    Invoke-WebRequest -Uri 'https://github.com/gitleaks/gitleaks/releases/download/v8.30.1/gitleaks_8.30.1_windows_x64.zip' -OutFile $archivePath
}
$expectedHash = 'd29144deff3a68aa93ced33dddf84b7fdc26070add4aa0f4513094c8332afc4e'
if ((Get-FileHash -LiteralPath $archivePath -Algorithm SHA256).Hash -ine $expectedHash) { throw 'Gitleaks archive checksum mismatch' }
Expand-Archive -LiteralPath $archivePath -DestinationPath $toolDir -Force
git config --local core.hooksPath .githooks
if ($LASTEXITCODE -ne 0) { throw 'Hook installation failed' }
Write-Output 'Gitleaks 8.30.1 installed with SHA256 verification; repository-local pre-commit hook enabled.'
