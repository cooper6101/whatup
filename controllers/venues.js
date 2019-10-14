const Venue = require('../models/venue');
const passport = require('passport');

module.exports = {

    // GET /register
    getVenueRegister(req, res, next) {
        res.render('venue/register');
    },

    // POST /venue
    async postVenueRegister(req, res, next) {
        const newVenue = new Venue ({
            title: req.body.title,
            hours: req.body.hours,
            description: req.body.description,
            specials: req.body.specials,
            events: req.body.events
        });
        
        //use req.body to create a new venue
        await Venue.register(newVenue);
        req.session.success = 'Venue created successfully!';
        res.redirect(`/venue/${newVenue.id}`);
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
    