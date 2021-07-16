# home-tv

A Raspberry Pi based Weather Station and Mini TV

## Implementation

* Local Server runs on Node.js express
* Frontend is based on React.js
* The ``kiosk.sh`` runs the express server, starts up Chromium in kiosk mode and naviagtes to the server's address
* The ``kiosk.sh`` script is run on every reboot via a cronjob
* The wather data is fetched and sent to the server via the ``dht.py`` script which uses the Adafruit DHT python library
* DHT11 sensor is used and its data pin is connected to Pin 7 (GPIO4) of the Raspberry Pi
