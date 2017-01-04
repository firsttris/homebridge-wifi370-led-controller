# homebridge-hyperion
[Homebridge](https://github.com/nfarina/homebridge) accessory plugin for Hyperion

Homebridge Plugin to use WIFI 370 Controller as HomeKit device.

Switch WIFI 370 Controller on/off.
  
Control color and brightness of your WIFI 370 Controller.

### Which hardware is used in this project?

WIFI 370 LED CONTROLLER:
![Screenshot](https://dl.dropboxusercontent.com/u/13344648/dev/wifi370img.PNG)

Amazon Link (Germany):<br>
http://www.amazon.de/dp/B00G55329A/ref=cm_sw_r_tw_dp_64xWub0KG32KV


# Installation

1. Install homebridge using: npm install -g homebridge
2. Install this plugin using: npm install -g homebridge-wifi370-led-controller
3. Add Accessory (JSON) to your config.json See below for a sample.

# Configuration

Configuration sample:

 ```
        "accessories": [{
                  "accessory": "wifi370",
                  "name": "LED Controller Name",
                  "host": "20.1.0.142",
                  "port": "5577"
                        }]
```

Fields:

* "accessory": Name of Accessory "wifi370" (required)
* "name": Name of LED Controller (required)
* "host": The hostname or ip (required)
* "port": The port (usually 5577) (required)
