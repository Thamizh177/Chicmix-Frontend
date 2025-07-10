#!/bin/bash

# Ensure script stops on any error
set -e

# Navigate to frontend code directory
cd /home/ec2-user/frontend

# Install Node.js (LTS version)
curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
sudo yum install -y nodejs

# Install frontend dependencies
npm install

# Build the production-ready frontend
npm run build
