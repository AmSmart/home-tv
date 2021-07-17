#!/bin/bash

export DISPLAY=:0.0
ps aux|grep -v grep|grep "/usr/lib/Xorg"
EXITSTATUS=$?
while ! xset q &>/dev/null
do
  echo "X server not running"
  sleep 2.5
done

lxterminal -e /usr/bin/node /home/pi/home-tv/app.js