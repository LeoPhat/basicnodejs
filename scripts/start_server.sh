#!bin/bash
cd /var/api/basicnodejs
npm install
sudo pm2 start index.js -i 0

