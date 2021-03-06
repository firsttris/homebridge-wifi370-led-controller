# homebridge-wifi370-led-controller

:bulb: [Homebridge](https://github.com/nfarina/homebridge) plugin to use WIFI370 Led-Controller as HomeKit accessory

## Features

- Switch on/off
- Control color and brightness
- Get current state/color

## Install

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

### Configuration

Configuration sample:

 ```
        "accessories": [{
                  "accessory": "wifi370",
                  "controller": "LW12",
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

#### Controller Support
|Controller  | Supported     | Type  |
| ---------- |:-------------:| -----:|
| LW12       | [x]           | RGB   |
| LD382      | [x]           | RGB   |
| LD382A     | [x]           | RGB   |
| LD686      | [x]           | RGBW  |

Thanks to Meik Dirkes for reverse engineering the communication for all controller types.

#### WIFI370-LED Controller

![Screenshot](https://github.com/firsttris/homebridge-wifi370-led-controller/blob/master/wiki/wifi370img.PNG)

Link to Amazon (Germany): [Link](https://www.amazon.de/dp/B00Q6FKPZI/ref=cm_sw_r_tw_dp_x_HavByb4T01Q88)

## Donate
[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=KEAR9ZC228YCL)

## License
See the [LICENSE](LICENSE.md) file for license rights and limitations (MIT).
