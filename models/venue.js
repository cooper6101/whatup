const mongoose = require('mongoose');
const User = require('./user');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    images: String,
    title: String,
    hours: String,
    location: String,
    description: String,
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    specials: String,
    events: String
});

module.exports = mongoose.model('Venue', VenueSchema);