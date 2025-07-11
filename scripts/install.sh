#!/bin/bash

NODE="/usr/local/nodejs/bin/node"
NPM="/usr/local/nodejs/bin/npm"

echo "Checking if Node.js and npm are installed..."
if [ -x "$NODE" ] && [ -x "$NPM" ]; then
  echo "✅ Node.js and npm are already installed."
else
  echo "❌ Node.js or npm is missing at expected path."
  exit 1
fi

echo "Changing ownership of the frontend directory to ec2-user..."
sudo chown -R ec2-user:ec2-user /home/ec2-user/frontend

echo "Installing frontend dependencies..."
cd /home/ec2-user/frontend

# Run npm install with correct node path in env
sudo -u ec2-user env PATH="/usr/local/nodejs/bin:$PATH" $NPM install
