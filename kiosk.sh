#!/bin/bash

xset s noblank
xset s off
xset -dpms

unclutter -idle 0.5 -root &

sed -i 's/"exited_cleanly":false/"exited_cleanly":true/' /home/pi/.config/chromium/Default/Preferences
sed -i 's/"exit_type":"Crashed"/"exit_type":"Normal"/' /home/pi/.config/chromium/Default/Preferences

/usr/bin/node /home/pi/home-tv/server/index.js &
sleep 0.5
/usr/bin/chromium-browser --noerrdialogs --disable-infobars --kiosk http://localhost:3001/ &