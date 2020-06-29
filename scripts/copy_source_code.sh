#!bin/bash

cd /var/api

#xoa het source code cu
sudo rm -rf *

#copy source code moi tu git
git clone https://github.com/LeoPhat/basicnodejs.git
cd basicnodejs
sudo chown -R ec2-user:ec2-user *
sudo chmod 755 * -R
