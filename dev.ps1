# dev.ps1 — Kill port 3000 then start Next.js dev server
# Usage: .\dev.ps1
# Usage with custom port: .\dev.ps1 -Port 3001

param(
    [int]$Port = 3000
)

$npm = "C:\Program Files\nodejs\npm.cmd"

Write-Host ""
Write-Host "=== Pannya LMS Dev Server ===" -ForegroundColor Cyan

# ── 1. Find and kill any process on the target port ───────────────────────────
Write-Host "Checking port $Port..." -ForegroundColor Yellow

$connections = netstat -ano | Select-String ":$Port\s" | Select-String "LISTENING"

if ($connections) {
    foreach ($line in $connections) {
        $parts = ($line -replace '\s+', ' ').Trim().Split(' ')
        $procId = $parts[-1]
        if ($procId -match '^\d+$' -and [int]$procId -ne 0) {
            $proc = Get-Process -Id $procId -ErrorAction SilentlyContinue
            $name = if ($proc) { $proc.Name } else { "unknown" }
            Write-Host "  Killing PID $procId ($name) on port $Port..." -ForegroundColor Red
            Stop-Process -Id $procId -Force -ErrorAction SilentlyContinue
        }
    }
    Start-Sleep -Milliseconds 500
    Write-Host "  Port $Port cleared." -ForegroundColor Green
} else {
    Write-Host "  Port $Port is free." -ForegroundColor Green
}

# ── 2. Start dev server ────────────────────────────────────────────────────────
Write-Host ""
Write-Host "Starting: npm run dev  →  http://localhost:$Port" -ForegroundColor Cyan
Write-Host "Press Ctrl+C to stop." -ForegroundColor DarkGray
Write-Host ""

Set-Location $PSScriptRoot

if ($Port -ne 3000) {
    & $npm run dev -- --port $Port
} else {
    & $npm run dev
}
