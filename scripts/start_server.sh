#!/bin/bash
cd /var/api/basicnodejs
npm install
echo $(pm2 status) > /home/ec2-user/output_start_server.txt
pm2 start index.js --name "phat"

