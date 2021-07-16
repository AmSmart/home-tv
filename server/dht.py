import Adafruit_DHT
import requests
import time

DHT_SENSOR = Adafruit_DHT.DHT11
DHT_PIN = 4

while True:
    humidity, temperature = Adafruit_DHT.read_retry(DHT_SENSOR, DHT_PIN)
    try:
        if humidity is not None and temperature is not None:
            print("Temp={0:0.1f}*C  Humidity={1:0.1f}%".format(temperature, humidity))
            requests.post(f'http://localhost:3001/api/dht?temp={temperature}&humidity={humidity}')
        else:
            print("Failed to retrieve data from humidity sensor")
            requests.post('http://localhost:3001/api/error/')
        time.sleep(5)
    except:
        pass