const User = require('../models/user');
const passport = require('passport');

module.exports = {
    // GET /
    getIndex(req, res, next) {
        res.render('index');
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
        image: req.body.image,
        phone: req.body.phone
        });
        await User.register(newUser, req.body.password);
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