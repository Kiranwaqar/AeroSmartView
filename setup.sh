#!/bin/bash

# Quick Start Script for AeroSmart Development
# This script sets up and runs the complete development environment

set -e  # Exit on error

echo "🚀 AeroSmart Development Environment Setup"
echo "=========================================="
echo ""

# Check Node.js version
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v18+"
    exit 1
fi

NODE_VERSION=$(node -v)
echo "✅ Node.js $NODE_VERSION detected"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
echo "  • Frontend dependencies..."
npm install

echo "  • Backend dependencies..."
cd server
npm install
cd ..

echo "✅ Dependencies installed!"
echo ""

# Copy environment files if they don't exist
if [ ! -f ".env.local" ]; then
    echo "📝 Creating .env.local with defaults..."
    cp .env.example .env.local
fi

if [ ! -f "server/.env" ]; then
    echo "📝 Creating server/.env with defaults..."
    cp server/.env.example server/.env
fi

echo ""
echo "=========================================="
echo "✨ Setup Complete!"
echo "=========================================="
echo ""
echo "To start development:"
echo ""
echo "  Option 1: Run both servers together"
echo "    npm run dev:all"
echo ""
echo "  Option 2: Run separately"
echo "    Terminal 1: npm run dev"
echo "    Terminal 2: npm run dev:backend"
echo ""
echo "Frontend: http://localhost:5173"
echo "Backend: http://localhost:3001"
echo ""
echo "For more information, see README.md"
echo "For deployment instructions, see DEPLOYMENT.md"
