const Venue = require('../models/venue');
const passport = require('passport');

module.exports = {

    // GET /register
    getVenueRegister(req, res, next) {
        res.render('venue/register');
    },

    // POST /venue
    async postVenueRegister(req, res, next) {
        req.body.venue.title = String;
        req.body.venue.hours = String;
        req.body.venue.description = String;
        req.body.venue.specials = String;
        req.body.venue.events = String;
        
        //use req.body to create a new venue
        let venue = new Venue(req.body.venue);
		await venue.save();
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
    getShow(req, res, next) {
        res.render('venue/show');
    },

    // GET /venue/:id/edit
    getEdit(req, res, next) {
        res.render('venue/edit');
      }

}
    