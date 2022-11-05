#!/bin/bash
# A sample Bash script, by Ryan
echo send_daily_update_email
cd $1

export NVM_DIR=$HOME/.nvm;
source $NVM_DIR/nvm.sh;
nvm use

node jobs/send_daily_update_email.js
