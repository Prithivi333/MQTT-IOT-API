const express = require('express');
const bp = require('body-parser');
const path = require('path');
const logger = require('morgan');
const mqtt = require('mqtt');
const { isMAC } = require('getmac');
const mac=require('getmac').default;

var deviceId=mac();
if(deviceId){
    console.log(deviceId);
    client = mqtt.connect('mqtt://:@:',{clientId: deviceId});
    client.on('message', (topic,msg) => {
        if(topic=='device name'){
            console.log(msg.toString());
            //process msg to the csv file or as needed
        }
    })
}
else {console.log('Could not obtain MAC');}

const app = express();
app.use(logger("dev"));

// app.use(express.static(__dirname+'/static'));
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname + '/main.html'));
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('listening on port ' + port)
});