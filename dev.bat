@echo off
:: dev.bat — Double-click to kill port 3000 and start Next.js dev server
powershell -ExecutionPolicy Bypass -File "%~dp0dev.ps1"
pause
