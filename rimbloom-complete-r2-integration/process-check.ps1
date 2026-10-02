$ErrorActionPreference = 'Stop'
$taskRoot = 'rimbloom-complete-r2-integration'
$pre = Get-Content -Raw -LiteralPath "$taskRoot/internal/process-pre-stop.json" | ConvertFrom-Json
$post = Get-Content -Raw -LiteralPath "$taskRoot/internal/process-post-stop.json" | ConvertFrom-Json
$current = @(Get-CimInstance Win32_Process)
$original = @($pre.processes | Where-Object { $_.executable -match '\\(node|workerd|esbuild)\.exe$' })
$remaining = @($original | Where-Object {
    $entry = $_
    @($current | Where-Object { $_.ProcessId -eq $entry.pid -and $_.CreationDate.ToUniversalTime().Ticks -eq ([datetimeoffset]$entry.startTimeUtc).UtcDateTime.Ticks }).Count -gt 0
})
$listeners = @(Get-NetTCPConnection -State Listen -ErrorAction SilentlyContinue | Where-Object { $_.LocalPort -in $post.originalListenerPorts })
$logs = @($post.logs | ForEach-Object {
    $expected = $_
    $item = Get-Item -LiteralPath $expected.file
    $hash = (Get-FileHash -LiteralPath $expected.file -Algorithm SHA256).Hash.ToLowerInvariant()
    $unchanged = $item.Length -eq $expected.length -and $item.LastWriteTimeUtc.Ticks -eq ([datetimeoffset]$expected.lastWriteTimeUtc).UtcDateTime.Ticks -and $hash -eq $expected.sha256
    @{file=$expected.file; length=$item.Length; lastWriteTimeUtc=$item.LastWriteTimeUtc.ToString('o'); sha256=$hash; unchanged=$unchanged}
})
if ($remaining.Count -ne 0 -or $listeners.Count -ne 0 -or @($logs | Where-Object { -not $_.unchanged }).Count -ne 0) { throw 'Owned runtime/listener remains or retained log changed; STOP' }
$receipt = @{at=[datetime]::UtcNow.ToString('o'); status='PASS'; originalRuntimeIdentitiesRemaining=0; originalPortListenersRemaining=0; originalPorts=$post.originalListenerPorts; additionalStops=0; logs=$logs; credentialValuesOrFragmentsEmitted=$false; falsePositive=$false}
[System.IO.File]::WriteAllText((Join-Path (Get-Location) "$taskRoot/internal/process-final-check.json"), ($receipt | ConvertTo-Json -Depth 8), [System.Text.UTF8Encoding]::new($false))
Write-Output ($receipt | ConvertTo-Json -Depth 8 -Compress)
