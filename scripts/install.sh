#!/bin/bash
set -e

# Ensure Node.js is available in PATH
export PATH=/usr/local/nodejs/bin:$PATH

# Go to frontend code directory
cd /home/ec2-user/frontend

# Install and build
npm install
npm run build
