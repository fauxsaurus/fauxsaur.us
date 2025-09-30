#!/bin/bash

pathDeploy=$1
pathNvm=$2

PATH="$pathNvm:$PATH"

git pull origin main
npm i
npm run build
rsync -av --delete --exclude '.htaccess' --exclude '.well-known/' './dist/' $pathDeploy
