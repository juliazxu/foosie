//Set up requirements
var logger = require('morgan');
var Request = require('request');
var bodyParser = require('body-parser');
var http = require('http');
var express = require("express");
	app = module.exports.app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);
var saved = false;
var port = process.env.PORT || 3000; 

var stress = 0;

//Some Middleware - log requests to the terminal console
app.use(logger('dev'));

//Set up the views directory
app.set("views", __dirname + '/views');
//Set EJS as templating language WITH html as an extension
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');
//Add connection to the public folder for css & js files
app.use(express.static(__dirname + '/public'));

/*-----
ROUTES
-----*/

app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

// var stressSocket = io.of("/stress");
var stressSocket = io.of("https://foosie.herokuapp.com/stress")
stressSocket.on('connection', function (socket) {
	console.log('Connection established with client.');
	socket.emit('stress', stress);
});

var clickSocket = io.of("/destress");
clickSocket.on('connection', function(socket){
	console.log("destress connection online");
	socket.on('destressed', function(data){
		console.log("CLICKED!");
		console.log(data);
		stress--;
		stressSocket.emit('stress', stress);
	});
});

server.listen(port);
console.log('Express started on port 3000');
setInterval(function(){
	if (stress > 1005 || stress < 0)
		stress = 0
	else
		console.log(stress++);
	stressSocket.emit('stress', stress); 
}, 1000);
