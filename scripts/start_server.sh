#!/bin/bash
cd /var/api/basicnodejs
npm install
sudo npm install pm2@latest -g
pm2 start index.js --name "phat" -i 0
echo $(pm2 status) > /home/ec2-user/output_start_server.txt

