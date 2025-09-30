@echo off
REM TrossApp Development Cleanup Script
echo.
echo ========================================
echo  TrossApp Development Cleanup
echo ========================================
echo.

echo 🛑 Stopping all TrossApp processes...

REM Kill processes on port 3001 (Backend)
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":3001"') do (
    echo Stopping backend process %%a
    taskkill /f /pid %%a >nul 2>&1
)

REM Kill processes on port 8080 (Frontend) 
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":8080"') do (
    echo Stopping frontend process %%a
    taskkill /f /pid %%a >nul 2>&1
)

REM Kill any remaining Flutter processes
taskkill /f /im "flutter.exe" >nul 2>&1
taskkill /f /im "dart.exe" >nul 2>&1

echo.
echo ✅ Cleanup complete! All TrossApp processes stopped.
echo.
pause