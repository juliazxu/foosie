//Set up requirements
var logger = require('morgan');
var Request = require('request');
var bodyParser = require('body-parser');
var serialport = require('serialport');
var SerialPort = serialport.SerialPort;
var http = require('http');
var express = require("express");
	app = module.exports.app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);
var saved = false;
var port = process.env.PORT || 3000; 



//Some Middleware - log requests to the terminal console
app.use(logger('dev'));

//Set up the views directory
app.set("views", __dirname + '/views');
//Set EJS as templating language WITH html as an extension
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');
//Add connection to the public folder for css & js files
app.use(express.static(__dirname + '/public'));

//DATABASE
var db_USER = 'juliaxu';
var db_DATABASE = 'foosie';
var db_KEY = 'saggenuratheryounpideryi';
var db_PASSWORD = 'NHteQ8uF7xdvvR2dyxBr8drx';

var db_URL = 'https://' + db_USER + '.cloudant.com/' + db_DATABASE; 

/*-----
ROUTES
-----*/

app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

server.listen(process.env.PORT || 3000);
console.log('Express started on port 3000');

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

// function saveLatestData(data) {
//    console.log(data);
//    socket.emit('news',data);
//    latestData = data;
// }

function getcount(){
	console.log('Making a db request for all entries');
	//Use the Request lib to GET the data in the CouchDB on Cloudant
	Request.get({
		url: db_URL,
		headers:{"Content-Type": "application/json"},
		auth: {
			user: db_KEY,
			pass: db_PASSWORD
		},
		json: true
	},
	function (error, response, body){
		if (error)
			console.log(error);
		else{
			console.log(response.statusCode);
			console.log(body["doc_count"]);
			return body["doc_count"];
		}
	});
// });
}

app.get("/count", function(req,res){
	console.log('Making a db request for all entries');
	//Use the Request lib to GET the data in the CouchDB on Cloudant
	Request.get({
		url: db_URL,
		headers:{"Content-Type": "application/json"},
		auth: {
			user: db_KEY,
			pass: db_PASSWORD
		},
		json: true
	},
	function (error, response, body){
		if (error)
			console.log(error);
		else{
			console.log(response.statusCode);
			console.log(body["doc_count"]);
			res.json(body);
		}
	});
})

function saveToDatabase(val){
	var lol;
	console.log("A Fuzzie!!");

	if (saved){
		return;
	}

	if (saved == false){
		Request.post({
			url: db_URL,
			headers:{"Content-Type": "application/json"},
			auth: {
				user: db_KEY,
				pass: db_PASSWORD
			},
			//json: true,
			body: lol = JSON.stringify({
				fuzzieTime: new Date(),
				pressStrength: val
			})
		},
		function (error, response, body){
			if (response.statusCode == 201){
				console.log("Saved!");
				saved = true;
				getcount();
				// incrementClient();
			}
			else{
				console.log(lol);
				console.log("Error: " + response.statusCode);
			}
		});
	}
}

function showPortClose() {
   console.log('port closed.');
}

function showError(error) {
   console.log('Serial port error: ' + error);
}

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  myPort.on('data', function(data){
  	console.log(saved);
  	socket.emit('news',data);
  	if (data > 3.0){
  		console.log("FUZZIE!");
  		saveToDatabase(data);
  	}
  	else if (data < 3.0 && saved == true){
  		saved = false;
  	}
  });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

