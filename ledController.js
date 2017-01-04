const net = require('net');
let host = "20.1.0.142";
let port = 5577 * 1;
let color = require('color');
let selectedColor = color.rgb(255, 255, 255);
const red = color.rgb(255, 0, 0);
const INFO = ["239", "1", "119"];
const ON = ["204", "35", "51"];
const OFF = ["204", "36", "51"];
let powerState = false;

function setHost (value) {
    host = value;
}

function setPort (value) {
    port = value;
}

function send (array, callback) {
    const client = new net.Socket();
    client.connect(port, host, () => {
        const buffer = new Buffer(array);
        client.write(buffer);
        if(!callback) {
            client.end();
        }
    });
    client.on('error', (err) => {
        console.log('error : ' + err);
    });
    client.on('data', (data) => {
        callback(data.toString('hex'));
        client.end();
    });
    client.on('end', () => {
        console.log("end");
    });
}

function extractColorFromResponse (response) {
    response = response.match(/.{1,2}/g);
    const r = response[6];
    const g = response[7];
    const b = response[8];
    selectedColor = color("#"+r+g+b);
}

function extractPowerStateFromResponse (response) {
    response = response.match(/.{1,2}/g);
    powerState = response[2] == "23"
}

function setOn () {
    send(ON);
}

function getOn (callback) {
    send(INFO, (response) => {
        extractPowerStateFromResponse(response);
        callback(null, powerState);
    })
}

function setOff () {
    send(OFF);
}

function setColor (colorArray) {
    colorArray.unshift(86);
    colorArray.push(170);
    send(colorArray);
}

function setBrightness (value) {
    selectedColor = selectedColor.value(value);
    const rgbArray = selectedColor.rgb().round().array();
    console.log('Brightness Value ' + value);
    console.log('Brightness Color ' + rgbArray);
    setColor(rgbArray);
}

function getBrightness (callback) {
    send(INFO, (response) => {
        console.log("Brightness Response: "+response);
        extractColorFromResponse(response);
        console.log("GET Brightness Color" +selectedColor.rgb().round().array())
        callback(null, selectedColor.value());
    })
}

function setHue (value) {
    selectedColor = selectedColor.hue(value);
    const rgbArray = selectedColor.rgb().round().array();
    console.log('Hue Value ' + value);
    console.log('Hue Color ' + rgbArray);
    setColor(rgbArray);
}

function getHue (callback) {
    send(INFO, (response) => {
        extractColorFromResponse(response);
        callback(null, Math.round(selectedColor.hue()));
    })
}

function setSaturation (value) {
    selectedColor = selectedColor.saturationv(value)
    const rgbArray = selectedColor.rgb().round().array();
    console.log('Saturation Value ' + value);
    console.log('Saturation Color ' + rgbArray);
    setColor(rgbArray);
}

function getSaturation (callback) {
    send(INFO, (response) => {
        extractColorFromResponse(response);
        callback(null, Math.round(selectedColor.saturationv()));
    })
}

module.exports = {
    setBrightness,
    getBrightness,
    setHue,
    getHue,
    setSaturation,
    getSaturation,
    setOn,
    getOn,
    setOff,
    setHost,
    setPort
};