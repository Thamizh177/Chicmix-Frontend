#!/bin/bash
cd /home/ec2-user/frontend
nohup npm start > frontend.log 2>&1 &
