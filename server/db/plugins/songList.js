//This mongoode plugin gets passed a schema and adds to fields to it (songs & artist)
//It ensures that songs are unique
 var _ = require('lodash')
 var mongoose = require('mongoose')

 module.exports = function(schema) {
 	schema.add({
 		songs: [{ type: mongoose.Schema.Types.ObjectId, ref:'Song' }],
 		artists: [{ type: mongoose.Schema.Types.ObjectId, ref:'Artist' }]
 	})

 	schema.pre('validate', function(next) {
 		if (!this.isModified('songs')) return next()
 		this.songs = _.uniq(this.songs)
 		next()
 	})

 	//redo artists array if songs change

 	schema.pre('save', function(next) {
 		var self = this
 		if (!this.isModified('songs')) return next()

 		this
 			.populate('songs')
 			.execPopulate() //get promise
 			.then(function(songList) {
 				console.log(songList, "plugin")
 				return songList.songs
 					.map( song => song.artists )
 					.reduce(function(albumArtists, songArtists) {
 						return albumArtists.concat(songArtists)
 					}, [])
 			})
 			.then(function(artists) {
 				self.artists = _.uniq(artists.map(String))
 				self.markModifies('artists')
 				next()
 			}, next)
 	})
 }