#!/bin/bash
set -e  # Exit immediately on error
echo "Installing frontend dependencies..."
cd /home/ec2-user/frontend || exit 1
sudo npm install --legacy-peer-deps
echo "Dependencies installed!"
