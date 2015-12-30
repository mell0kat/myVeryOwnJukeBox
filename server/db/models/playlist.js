var mongoose = require('mongoose'),
	songListPlugin = require('../plugins/songList')
var Schema = mongoose.Schema

var schema = new Schema({ 
	name: { type: String, require:true, trim: true }
})

//The songlist plugin gives it song and artist arrays with some
//validations and auto population

schema.plugin(songListPlugin)

module.exports = mongoose.model('Playlist', schema);