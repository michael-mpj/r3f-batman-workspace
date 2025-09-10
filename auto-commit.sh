#!/bin/bash

# Watches for file changes and auto-commits them every 10 seconds
while true; do
  git add .
  if ! git diff --cached --quiet; then
    git commit -m "auto: commit file changes"
    git push
  fi
  sleep 10
done
