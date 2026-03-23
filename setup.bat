@echo off
REM Quick Start Script for AeroSmart Development (Windows)

setlocal enabledelayedexpansion

echo.
echo 🚀 AeroSmart Development Environment Setup
echo ==========================================
echo.

REM Check Node.js version
where /q node
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js v18+
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
echo ✅ Node.js %NODE_VERSION% detected
echo.

REM Install dependencies
echo 📦 Installing dependencies...
echo   • Frontend dependencies...
call npm install

echo   • Backend dependencies...
cd server
call npm install
cd ..

echo ✅ Dependencies installed!
echo.

REM Copy environment files if they don't exist
if not exist ".env.local" (
    echo 📝 Creating .env.local with defaults...
    copy .env.example .env.local
)

if not exist "server\.env" (
    echo 📝 Creating server\.env with defaults...
    copy server\.env.example server\.env
)

echo.
echo ==========================================
echo ✨ Setup Complete!
echo ==========================================
echo.
echo To start development:
echo.
echo   Option 1: Run both servers together
echo     npm run dev:all
echo.
echo   Option 2: Run separately
echo     Terminal 1: npm run dev
echo     Terminal 2: npm run dev:backend
echo.
echo Frontend: http://localhost:5173
echo Backend: http://localhost:3001
echo.
echo For more information, see README.md
echo For deployment instructions, see DEPLOYMENT.md
echo.
pause
