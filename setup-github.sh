#!/bin/bash

# Replace YOUR_GITHUB_USERNAME with your actual GitHub username
GITHUB_USERNAME="YOUR_GITHUB_USERNAME"

echo "Setting up GitHub remote repository..."

# Add the remote repository
git remote add origin "https://github.com/${GITHUB_USERNAME}/Promax-digital-royal-website.git"

# Verify the remote was added
echo "Remote repository added:"
git remote -v

# Push to GitHub
echo "Pushing to GitHub..."
git branch -M main
git push -u origin main

echo "✅ Repository successfully connected to GitHub!"
echo "🔗 Visit: https://github.com/${GITHUB_USERNAME}/Promax-digital-royal-website"