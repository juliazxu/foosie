//Set up requirements
var Request = require('request');
var serialport = require('serialport');
var SerialPort = serialport.SerialPort;
var app = require('http').createServer(handler);
var io = require('socket.io-client');

var herokuApp = io.connect("http://foosie.herokuapp.com/destress");
herokuApp.on("connect", function(socket){
	console.log("connected to Heroku!!! YAY!!");
});

function handler (req, res) {
	res.writeHead(200);
	res.end("Foosie Server ONLINE");
}

var myPort = new SerialPort("COM5", { 
   baudRate: 9600,
   // look for return and newline at the end of each data packet:
   parser: serialport.parsers.readline("\r\n") 
 });   
 
// these are the definitions for the serial events:
myPort.on('open', showPortOpen);  
myPort.on('close', showPortClose);
myPort.on('error', showError);

// these are the functions called when the serial events occur:
function showPortOpen() {
   console.log('port open. Data rate: ' + myPort.options.baudRate);
}

function showPortClose() {
   console.log('port closed.');
}

function showError(error) {
   console.log('Serial port error: ' + error);
}

//Connect to Arduino
myPort.on('data', function(data){
   	console.log(data);
   	if (data > 3.0){
   		console.log("FUZZIE!");
   		herokuApp.emit("destressed", "1");
   	}
});
app.listen(3000);
console.log("App listening on port 3000");
//setInterval(function(){herokuApp.emit("destressed", "1");console.log("Sent 1");}, 100);


