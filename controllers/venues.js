const Venue = require('../models/venue');
const passport = require('passport');
const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'whatup-llc',
    api_key: '636321972833769',
    api_secret: process.env.CLOUDINARY_SECRET
});

module.exports = {

    // GET /register
    getVenueRegister(req, res, next) {
        res.render('venue/register');
    },

    // POST /venue
    async postVenueRegister(req, res, next) {
        req.body.venue.images = []; 
        for(const file of req.files) {
            let image = await cloudinary.v2.uploader.upload(file.path);
            req.body.venue.images.push({
                url: image.secure_url,
                public_id: image.public_id
            });
        } 
        let venue = await Venue.create(req.body.venue);
        req.session.success = 'Venue created successfully!';
        res.redirect(`/venue/${venue.id}`);
    },

    // GET /login
    getLogin(req, res, next) {
        res.render('venue/login');
    },

    // POST /login
    postLogin(req, res, next) {
        passport.authenticate('local', 
    { 
        successRedirect: '/',
        failureRedirect: '/login' 
    })(req, res, next);
    },

    // GET /venue/:id
    async getShow(req, res, next) {
        //find venues by id
        let venue = await Venue.findById(req.params.id);
        res.render('venue/show', { venue });
    },

    // GET /venue/:id/edit
    getEdit(req, res, next) {
        res.render('venue/edit');
      }

}
    