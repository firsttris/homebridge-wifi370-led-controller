"use strict";
const WIFI370 = require('wifi370-js-api');
const NpmAutoUpdate = require('npm-auto-update');
let Service, Characteristic, UUIDGen;

module.exports = function (homebridge) {
    Service = homebridge.hap.Service;
    Characteristic = homebridge.hap.Characteristic;
    UUIDGen = homebridge.hap.uuid;
    homebridge.registerAccessory("homebridge-wifi370-led-controller", "wifi370", Wifi370Accessory);
};

function Wifi370Accessory (log, config) {
    this.log = log;
    this.autoUpdate = config["autoupdate"]!=null;
    this.host = config["host"];
    this.name = config["name"];
    this.npmAutoUpdate = new NpmAutoUpdate(log);
    if(this.autoUpdate) this.updatePackage();
    this.verifyConfig();
    this.ledController = new WIFI370(this.host, 5577);
    this.lightService = new Service.Lightbulb(this.name);
    this.infoService = new Service.AccessoryInformation();
    this.uuid = UUIDGen.generate(this.name);
}

Wifi370Accessory.prototype.updatePackage = function () {
        this.npmAutoUpdate.checkForUpdate((error, result) => {
            if(result) {
                this.npmAutoUpdate.updatePackage((error, result) => {
                });
            }
        });
};

Wifi370Accessory.prototype.verifyConfig = function () {
    if(!this.host || !this.name) {
        this.log.error("Please define name and host in config.json");
    }
};

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
