#!/bin/bash

echo "Checking if Node.js and npm are installed..."
if command -v node > /dev/null 2>&1 && command -v npm > /dev/null 2>&1; then
  echo "✅ Node.js and npm are already installed."
else
  echo "❌ Node.js or npm is missing. Please install them manually before CodeDeploy."
  exit 1
fi

echo "Changing ownership of the frontend directory to ec2-user..."
sudo chown -R ec2-user:ec2-user /home/ec2-user/frontend

echo "Installing frontend dependencies..."
cd /home/ec2-user/frontend

# Run npm install as ec2-user
sudo -u ec2-user npm install
