const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');

const VenueSchema = new Schema({
    title: String,
    hours: String,
    description: String,
    images: [ { url: String, public_id: String} ],
    specials: String,
    events: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Venue', VenueSchema);