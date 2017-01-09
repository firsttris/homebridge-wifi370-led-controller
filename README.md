# homebridge-wifi370-led-controller
[Homebridge](https://github.com/nfarina/homebridge) accessory for WIFI 370 Led Controller

Homebridge Plugin to use WIFI 370 Led Controller as HomeKit device.

###Features

- Switch WIFI 370 Controller on/off.
  
- Control color and brightness of your WIFI 370 Controller.

- Get current state

###Installation

[Homebridge](https://github.com/nfarina/homebridge) is required to use this plugin 

[![npm version](https://badge.fury.io/js/homebridge.svg)](https://badge.fury.io/js/homebridge)
```
npm install -g homebridge
```
Install this plugin 

[![npm version](https://badge.fury.io/js/homebridge-wifi370-led-controller.svg)](https://badge.fury.io/js/homebridge-wifi370-led-controller)
```
npm install -g homebridge-wifi370-led-controller
```
Add your Accessory to the config.json (See configuration sample below.)

#### Configuration

Configuration sample:

 ```
        "accessories": [{
                  "accessory": "wifi370",
                  "name": "LED Controller Name",
                  "host": "20.1.0.142",
                  "port": "5577"
                        }]
```

Attributes:

- "accessory": Name of Accessory "wifi370" (required)
- "name": Name of LED Controller (required)
- "host": The hostname or ip (required)
- "port": The port (usually 5577) (required)

### Which hardware is used?

![Screenshot](https://dl.dropboxusercontent.com/u/13344648/dev/wifi370img.PNG)

Link to Amazon (Germany): [Link](https://www.amazon.de/dp/B00Q6FKPZI/ref=cm_sw_r_tw_dp_x_HavByb4T01Q88)