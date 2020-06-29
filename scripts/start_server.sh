#!bin/bash
cd /var/api/basicnodejs
npm install
pm2 status
pm2 start index.js --name "phat"

