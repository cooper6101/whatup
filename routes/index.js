var express = require('express');
var router = express.Router();
const { 
  getIndex,
  getRegister,
  getShow,
  getEdit,
  getVenueRegister } = require('../controllers');
const { asyncErrorHandler } = require('../middleware');

/* GET home page. */
router.get('/', getIndex);

// GET /register // register new user
router.get('/register', getRegister);

// POST /register // create new user
router.post('/register', (req, res, next) => {
  res.send('POST /register');
});

// GET /profile/:id // show profile page
router.get('/profile/:id', getShow);

// GET /profile/:id/edit // show profile edit form
router.get('/profile/:id/edit', getEdit);

// PUT /profile/:id/ // update user
router.put('/profile/:id', (req, res, next) => {
  res.send('PUT /profile/:id');
});

// DELETE /profile/:id // delete profile
router.delete('/profile/:id', (req, res, next) => {
  res.send('DELETE /profile/:id');
});

module.exports = router;
