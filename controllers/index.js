const User = require('../models/user');
const Venue = require('../models/venue');
const passport = require('passport');

module.exports = {
    // GET /
    async getIndex(req, res, next) {
        let venues = await Venue.find({});
        res.render('index',  { venues });
    },

    // GET /register
    getRegister(req, res, next) {
        res.render('profile/register');
    },

    // POST /register
    async postRegister(req, res, next) {
        const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        image: req.body.image
        });
        await User.register(newUser, req.body.password);
        req.session.success = 'Registration Successful!';
        res.redirect('/');
    },

    // GET /login
    getLogin(req, res, next) {
        res.render('profile/login');
    },

    // POST /login
    postLogin(req, res, next) {
        passport.authenticate('local', 
    { 
        successRedirect: '/',
        failureRedirect: '/login' 
    })(req, res, next);
    },

    // GET /profile/:id 
    getShow(req, res, next) {
        res.render('profile/show');
    },

    // GET /profile/:id/edit
    getEdit(req, res, next) {
        res.render('profile/edit');
      }
}