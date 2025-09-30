@echo off
REM TrossApp Development Startup Script
echo.
echo ========================================
echo  TrossApp Development Environment
echo ========================================
echo.

REM Check if backend is already running
netstat -ano | findstr ":3001" >nul
if %errorlevel% == 0 (
    echo ✅ Backend already running on port 3001
) else (
    echo 🚀 Starting backend server...
    start "TrossApp Backend" cmd /k "cd /d "%~dp0..\backend" && npm start"
    timeout /t 3 /nobreak >nul
)

REM Check if frontend is running
netstat -ano | findstr ":8080" >nul
if %errorlevel% == 0 (
    echo ✅ Frontend already running on port 8080
) else (
    echo 🎨 Starting Flutter frontend...
    start "TrossApp Frontend" cmd /k "cd /d "C:\dev\frontend" && flutter run -d web-server --web-port 8080"
)

echo.
echo 🌐 Backend: http://localhost:3001/api/health
echo 🎯 Frontend: http://localhost:8080
echo.
echo Press any key to open both in browser...
pause >nul

start http://localhost:3001/api/health
start http://localhost:8080

echo.
echo Development environment started!
echo Close the terminal windows to stop the servers.
pause