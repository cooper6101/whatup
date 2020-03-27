const mongoose = require('mongoose');
const User = require('../models/user');
const Venue = require('../models/venue');
const passport = require('passport');

module.exports = {
    // GET /
    async getLanding(req, res, next) {
        let venues = await Venue.find({});
        let users = await User.find({});
        res.render('landing',  { venues, users, mapboxToken: process.env.MAPBOX_TOKEN });   
    },

    // GET /home
    async getHome(req, res, next) {
        let venues = await Venue.find({});
        let users = await User.find({});
        res.render('home',  { venues, users, mapboxToken: process.env.MAPBOX_TOKEN });  
    },

    // GET /allvenues
    async getIndex(req, res, next) {
        let venues = await Venue.find({});
        let users = await User.find({});
        res.render('index',  { venues, users, mapboxToken: process.env.MAPBOX_TOKEN });
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
    async getShow(req, res, next) {
        //find users by id
        let user = await User.findById(req.params.id);
        res.render('profile/show', { user });
    },

    // GET /profile/:id/edit
    async getEdit(req, res, next) {
        //find user by id
        let user = await User.findById(mongoose.Types.ObjectId(req.params.user_id));
        res.render('profile/edit', { user });
    }
}