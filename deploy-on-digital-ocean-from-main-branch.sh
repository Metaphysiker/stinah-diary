#!/bin/bash
ng build
ssh sandro@159.65.120.231 << EOF
  cd stinah-diary
  git pull origin main
  nvm use
  npm install --omit=dev
EOF

ssh root@159.65.120.231 << EOF
  cd /home/sandro/stinah-diary/
  sudo service nginx restart
EOF
