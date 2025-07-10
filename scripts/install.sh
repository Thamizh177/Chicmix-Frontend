#!/bin/bash
set -e

# Make sure nodejs is in path if installed manually
export PATH=/usr/local/nodejs/bin:$PATH

cd /home/ec2-user/frontend

# Fix directory permissions so ec2-user can install packages
sudo chown -R ec2-user:ec2-user .

# Install dependencies
npm install

# Build the frontend
npm run build
