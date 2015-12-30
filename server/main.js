var runDb = require('./db');

//create server node instance
var server = require('http').createServer();

var createApp = function(){
	var app = require('./app')
	server.on('request', app);
};

var startServer = function() {
	var PORT = process.env.PORT || 8000;
	server.listen(PORT, function() {
		console.log('Server started on port ', PORT);
	});
};

runDb.then(createApp).then(startServer).catch(function(err){
	console.error(err.stack);
})