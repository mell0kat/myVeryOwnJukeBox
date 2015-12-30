var Promise = require('bluebird');
var path = require('path');

var db_uri = require(path.join(__dirname, '../env')).DATABASE_URI ;

var mongoose = require('mongoose');
var db = mongoose.connect(db_uri).connection;

require('/.models');

var startDBPromise = new Promise(function (resolve, reject) {
	db.on('open', resolve);
	db.on('error', reject);
})

console.log('Opening connection to MongoDB');
startDBPromise.then(function() {
	console.log('MongoDB connection open!')
})

module.exports = startDBPromise;