#!/bin/bash
cd /var/api/basicnodejs
npm install

pm2 start index.js --name "phat"
echo $(pm2 status) > /home/ec2-user/output_start_server.txt

