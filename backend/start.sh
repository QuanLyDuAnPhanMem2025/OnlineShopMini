#!/bin/bash

# Script to start backend server
echo "🚀 Starting PhoneStore Backend Server..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the backend directory."
    exit 1
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Start the server
echo "🔥 Starting server on port 3000..."
echo "📊 Using mock data service (no database required)"
echo "🔗 API will be available at: http://localhost:3000/api"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

npm run dev
