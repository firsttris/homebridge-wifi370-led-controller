/**
 * Created by Tristan on 30.12.2016.
 */
const WIFI370 = require('wifi370-js-api');
let Service, Characteristic, UUIDGen;

module.exports = function (homebridge) {
    Service = homebridge.hap.Service;
    Characteristic = homebridge.hap.Characteristic;
    Accessory = homebridge.hap.Accessory;
    UUIDGen = homebridge.hap.uuid;
    homebridge.registerAccessory("homebridge-wifi370", "wifi370", Wifi370Accessory);
}

function Wifi370Accessory (log, config) {
    this.log = log;
    this.ledController = new WIFI370(config["host"], 5577);
    this.name = config["name"];
    this.log("Starting wifi370 Accessory");
    this.lightService = new Service.Lightbulb(this.name);
    this.infoService = new Service.AccessoryInformation();
    this.uuid = UUIDGen.generate(this.name);
}

Wifi370Accessory.prototype.getServices = function () {

    this.lightService
        .getCharacteristic(Characteristic.On)
        .on('set', (value, callback) => {
            if (value) {
                this.ledController.setOn(callback);
            } else {
                this.ledController.setOff(callback);
            }
        })
        .on('get', (callback) => {
            this.ledController.getOn(callback);
        });

    this.lightService
        .addCharacteristic(Characteristic.Brightness)
        .on('set', (value, callback) => {
            this.ledController.setBrightness(value, callback);
        })
        .on('get', (callback) => {
            this.ledController.getBrightness(callback);
        });

    this.lightService
        .addCharacteristic(Characteristic.Hue)
        .on('set', (value, callback) => {
            this.ledController.setHue(value, callback);
        })
        .on('get', (callback) => {
            this.ledController.getHue(callback);
        });

    this.lightService
        .addCharacteristic(Characteristic.Saturation)
        .on('set', (value, callback) => {
            this.ledController.setSaturation(value, callback);
        })
        .on('get', (callback) => {
            this.ledController.getSaturation(callback);
        });

    this.infoService
        .setCharacteristic(Characteristic.Manufacturer, "wifi370")
        .setCharacteristic(Characteristic.Model, this.host)
        .setCharacteristic(Characteristic.SerialNumber, this.lightService.UUID);

    let services = [];
    services.push(this.lightService);
    services.push(this.infoService);

    return services;
};
