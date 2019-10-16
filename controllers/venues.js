const Venue = require('../models/venue');
const passport = require('passport');

module.exports = {

    // GET /register
    getVenueRegister(req, res, next) {
        res.render('venue/register');
    },

    // POST /venue
    async postVenueRegister(req, res, next) {  
        let venue = await Venue.create(req.body);

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
    