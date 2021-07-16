#!/bin/bash

export DISPLAY=:0.0
ps aux|grep -v grep|grep "/usr/lib/Xorg"
EXITSTATUS=$?
while ! xset q &>/dev/null
do
  echo "X server not running"
  sleep 2.5
done

xset s noblank
xset s off
xset -dpms

unclutter -idle 0.5 -root &

sed -i 's/"exited_cleanly":false/"exited_cleanly":true/' /home/pi/.config/chromium/Default/Preferences
sed -i 's/"exit_type":"Crashed"/"exit_type":"Normal"/' /home/pi/.config/chromium/Default/Preferences

/usr/local/bin/node /home/pi/home-tv/server/index.js &
sleep 0.5
/usr/bin/chromium-browser --noerrdialogs --disable-infobars --kiosk http://localhost:3001/ &