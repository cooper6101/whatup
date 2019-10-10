const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: String,
    email: String,
    image: String,
    phone: String,
    venues: []
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);