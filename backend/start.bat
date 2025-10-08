@echo off
echo 🚀 Starting PhoneStore Backend Server...

REM Check if we're in the right directory
if not exist "package.json" (
    echo ❌ Error: package.json not found. Please run this script from the backend directory.
    pause
    exit /b 1
)

REM Check if node_modules exists
if not exist "node_modules" (
    echo 📦 Installing dependencies...
    npm install
)

REM Start the server
echo 🔥 Starting server on port 3000...
echo 📊 Using mock data service (no database required)
echo 🔗 API will be available at: http://localhost:3000/api
echo.
echo Press Ctrl+C to stop the server
echo.

npm run dev
