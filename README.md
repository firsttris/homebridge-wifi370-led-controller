# homebridge-wifi370-led-controller

:bulb: [Homebridge](https://github.com/nfarina/homebridge) plugin to use WIFI370 Led-Controller as HomeKit accessory

###Features

- Switch on/off
- Control color and brightness
- Get current state/color

###Installation

[Homebridge](https://github.com/nfarina/homebridge) is required

[![npm version](https://badge.fury.io/js/homebridge.svg)](https://badge.fury.io/js/homebridge)

```
npm install -g homebridge
```

to use this plugin

[![npm version](https://badge.fury.io/js/homebridge-wifi370-led-controller.svg)](https://badge.fury.io/js/homebridge-wifi370-led-controller)

```
npm install -g homebridge-wifi370-led-controller
```

Add your Accessory to the config.json

#### Configuration

Configuration sample:

 ```
        "accessories": [{
                  "accessory": "wifi370",
                  "autoupdate": "true",
                  "name": "LED Controller Name",
                  "host": "20.1.0.142"
                        }]
```

Attributes:

- "accessory": Name of Accessory "wifi370" (required)
- "autoupdate": Autoupdate this package from NPM (optional, only for one device!)
- "name": Name of LED Controller (required)
- "host": The hostname or ip (required)

### Which hardware is used?

![Screenshot](https://dl.dropboxusercontent.com/u/13344648/dev/wifi370img.PNG)

Link to Amazon (Germany): [Link](https://www.amazon.de/dp/B00Q6FKPZI/ref=cm_sw_r_tw_dp_x_HavByb4T01Q88)