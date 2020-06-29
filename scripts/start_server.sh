#!bin/bash
cd /var/api/basicnodejs
npm install
pm2 status
sudo pm2 start index.js -i 0

