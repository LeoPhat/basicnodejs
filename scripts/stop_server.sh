#!/bin/bash
cd /var/api/basicnodejs
sudo pm2 stop all 
sudo pm2 delete all
pm2 kill
rm -rf ~/.pm2 

