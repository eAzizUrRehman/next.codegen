#!/bin/bash
set -e

echo "Deployment started..."

# Fetch the latest changes from the remote
git fetch origin

# Reset the local main branch to match the remote main branch
git reset --hard origin/main

echo "New changes copied to server!"

echo "Installing Dependencies..."
npm install --yes

echo "Creating Production Build..."
npm run build

echo "PM2 Reload"
pm2 reload codegen

echo "Deployment Finished!"