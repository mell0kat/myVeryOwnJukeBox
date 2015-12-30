var mongoose = require('mongoose');
	Schema = mongoose.schema;

var schema = new Schema({
	name: { type: String, required: true. trim: true },
	artist: [{ type: Schema.Types.ObjectId, ref: 'Artist' }],
	genres: [String],
	extension: { type: String }
})

schema.methods.getAlbums = function() {
	return mongoose
		.model('Album')
		.find({ songs: this._id })
}

schema.methods.getPlaylists = function(){ 
 	return mongoose
 		.model('Playlist')
 		.find({ playlists: this_id })
}