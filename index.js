/**
 * Created by Tristan on 30.12.2016.
 */
let ledController = require('./ledController.js');
let Service, Characteristic, UUIDGen;

module.exports = function (homebridge) {
    Service = homebridge.hap.Service;
    Characteristic = homebridge.hap.Characteristic;
    Accessory = homebridge.hap.Accessory;
    UUIDGen = homebridge.hap.uuid;
    homebridge.registerAccessory("homebridge-wifi370", "wifi370", wifi370Accessory);
}

function wifi370Accessory (log, config) {
    this.log = log;
    ledController.setHost(config["host"]);
    ledController.setPort(config["port"]);
    this.name = config["name"];
    this.log("Starting wifi370 Accessory");
    uuid = UUIDGen.generate(this.name);
}

wifi370Accessory.prototype.identify = function (callback) {
    this.log("identify");
}

wifi370Accessory.prototype.getServices = function () {
    this.log("getServices")

    let lightService = new Service.Lightbulb(this.name);

    lightService
        .getCharacteristic(Characteristic.On)
        .on('set', (value, callback) => {
            console.log('Set ON ' + value);

            if (value) {
                ledController.setOn();
            } else {
                ledController.setOff();
            }
            callback();
        })
        .on('get', (callback) => {
            ledController.getOn(callback);
        });

    lightService
        .addCharacteristic(Characteristic.Brightness)
        .on('set', (value, callback) => {
            ledController.setBrightness(value);
            callback();
        })
        .on('get', (callback) => {
            ledController.getBrightness(callback);
        });

    lightService
        .addCharacteristic(Characteristic.Hue)
        .on('set', (value, callback) => {
            ledController.setHue(value);
            callback();
        })
        .on('get', (callback) => {
            ledController.getHue(callback);
        });

    lightService
        .addCharacteristic(Characteristic.Saturation)
        .on('set', (value, callback) => {
            ledController.setSaturation(value);
            callback();
        })
        .on('get', (callback) => {
            ledController.getSaturation(callback);
        });

    let infoService = new Service.AccessoryInformation();
    infoService
        .setCharacteristic(Characteristic.Manufacturer, "wifi370")
        .setCharacteristic(Characteristic.Model, this.host)
        .setCharacteristic(Characteristic.SerialNumber, lightService.UUID);

    let services = [];
    services.push(lightService);
    services.push(infoService);

    return services;
}
