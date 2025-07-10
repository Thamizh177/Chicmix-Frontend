#!/bin/bash

echo "Checking if Node.js is already installed..."
if command -v node > /dev/null 2>&1 && command -v npm > /dev/null 2>&1; then
    echo "Node and npm already installed."
else
    echo "Installing Node.js and npm..."
    # Use curl + bash only if absolutely necessary
    curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
    sudo yum install -y nodejs
fi

echo "Installing frontend dependencies..."
cd /home/ec2-user/frontend
sudo npm install
