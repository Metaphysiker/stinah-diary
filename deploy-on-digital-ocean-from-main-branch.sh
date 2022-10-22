#!/bin/bash
ng build
git add .
git commit -m "ng build"
git push origin main

ssh sandro@159.65.120.231 << EOF
  cd stinah-diary
  git pull origin main
  export NVM_DIR=$HOME/.nvm;
  source $NVM_DIR/nvm.sh;
  nvm use
  npm install --omit=dev
EOF

ssh root@159.65.120.231 << EOF
  cd /home/sandro/stinah-diary/
  sudo service nginx restart
EOF
