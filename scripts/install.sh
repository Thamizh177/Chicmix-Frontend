#!/bin/bash

# Install Node.js and npm if not already installed
curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
sudo yum install -y nodejs

# Move to frontend app directory
cd /home/ec2-user/frontend

# Install dependencies
npm install
