#!/bin/bash

echo "🚀 AI Social Content Creator - Deployment Script"
echo "================================================"

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git repository not found. Please initialize git first:"
    echo "   git init"
    echo "   git add ."
    echo "   git commit -m 'Initial commit'"
    exit 1
fi

# Check if remote origin exists
if ! git remote get-url origin > /dev/null 2>&1; then
    echo "❌ No remote origin found. Please add your GitHub repository:"
    echo "   git remote add origin https://github.com/yourusername/your-repo-name.git"
    exit 1
fi

echo "✅ Git repository found"

# Build the project
echo "🔨 Building project..."
yarn build

if [ $? -eq 0 ]; then
    echo "✅ Build successful"
else
    echo "❌ Build failed"
    exit 1
fi

# Push to GitHub
echo "📤 Pushing to GitHub..."
git add .
git commit -m "Deploy: $(date)"
git push origin main

if [ $? -eq 0 ]; then
    echo "✅ Code pushed to GitHub"
    echo ""
    echo "🎉 Deployment Steps:"
    echo "1. Go to https://vercel.com"
    echo "2. Sign up/Login with GitHub"
    echo "3. Click 'New Project'"
    echo "4. Import your repository"
    echo "5. Add environment variables:"
    echo "   - OPENAI_API_KEY=your_openai_api_key"
    echo "   - NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app"
    echo "6. Click 'Deploy'"
    echo ""
    echo "🌐 Your app will be live at: https://your-project.vercel.app"
else
    echo "❌ Failed to push to GitHub"
    exit 1
fi 