var express = require('express');
var router = express.Router();
const { asyncErrorHandler } = require('../middleware');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.send('GET /');
});

// GET /register // register new user
router.get('/register', (req, res, next) => {
  res.send('GET /register');
});

// POST /register // create new user
router.post('/register', (req, res, next) => {
  res.send('POST /register');
});

// GET /registerVenue // register new Venue
router.get('/registervenue', (req, res, next) => {
  res.send('GET /registervenue');
});

// POST /registerVenue // create new Venue
router.post('/registervenue', (req, res, next) => {
  res.send('POST /registervenue');
});

// GET /profile/:id // show profile page
router.get('/profile/:id', (req, res, next) => {
  res.send('GET /profile/:id');
});

// GET /profile/:id/edit // show profile edit form
router.get('/profile/:id/edit', (req, res, next) => {
  res.send('GET /profile/:id/edit');
});

// PUT /profile/:id/ // update user
router.put('/profile/:id', (req, res, next) => {
  res.send('PUT /profile/:id');
});

// DELETE /profile/:id // delete profile
router.delete('/profile/:id', (req, res, next) => {
  res.send('DELETE /profile/:id');
});

module.exports = router;
