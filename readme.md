# home-tv

A Raspberry Pi based Weather Station and Mini TV

## Implementation

* Local Server runs on Node.js express
* Frontend is based on React.js
* The ``kiosk.sh`` runs the express server, starts up Chromium in kiosk mode and naviagtes to the server's address
* The ``kiosk.sh`` script is run on every reboot via a cronjob
* The wather data is fetched and sent to the server via the ``dht.py`` script which uses the Adafruit DHT python library
* DHT11 sensor is used and its data pin is connected to Pin 7 (GPIO4) of the Raspberry Pi

## Deployment Process

### Follow the below instructions

* Ensure Node.JS is installed
* git clone <https://github.com/AmSmart/home-tv>
* ``npm install`` (in ``./home-tv``)
* ``npm install`` (in ``./home-tv/ClientApp``)
* ``npm run build`` (in ``./home-tv/ClientApp``)
* ENSURE the Node installation path tallies with the ones in the shell scripts - ``./home-tv/startup.sh`` and ``./home-tv/kiosk.sh``. Also ensure both scrips have adequate permission to be executed
* ``crontab -e``  
    (Add the below line to the cron file, ensure you subsitute the app's directory)
    ``@reboot $APP_DIRECTORY/startup.sh``
* Reboot the Pi to test
