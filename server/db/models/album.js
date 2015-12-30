const mongoose = require('mongoose'),
		songListPlugin = require('../plugins'),
		findOrCreate = require('../plugins/findOrCreate'),
		deepPopulate = require('mongoose-deep-populate')(mongoose);

var Schema = mongoose.Schema

var schema = new Schema({
	name: { type: String, required: true, trim: true},
	cover: { type: Buffer, select: false },
	coverType: { type: String, select: false }
})

//Look up what these are doing
schema.plugin(songListPlugin)
schema.plugin(findOrCreate)
schema.plugin(deepPopulate);

module.exports = mongoose.model('Album', schema)