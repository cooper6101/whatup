const express = require('express');
const router = express.Router();
const { 
  getLanding,
  getHome,
  getIndex,
  getRegister,
  postRegister,
  getLogin,
  postLogin,
  getShow,
  getEdit,
  getVenueRegister } = require('../controllers');
const { asyncErrorHandler } = require('../middleware');

// GET Landing Page
router.get('/', asyncErrorHandler(getLanding));

// GET Home Page
router.get('/home', asyncErrorHandler(getHome));

/* GET index page. */
router.get('/allvenues',  asyncErrorHandler(getIndex));

// GET /register // register new user
router.get('/register', getRegister);

// POST /register // create new user
router.post('/register', asyncErrorHandler(postRegister));

// GET /login // get login page
router.get('/login', getLogin);

// POST /login // login user
router.post('/login', postLogin);

// GET /profile/:id // show profile page
router.get('/profile/:id', asyncErrorHandler(getShow));

// GET /profile/:id/edit // show profile edit form
router.get('/profile/:user_id/edit', asyncErrorHandler(getEdit));

// PUT /profile/:id/ // update user
router.put('/profile/:user_id', (req, res, next) => {
  res.send('PUT /profile/:user_id');
});

// DELETE /profile/:id // delete profile
router.delete('/profile/:id', (req, res, next) => {
  res.send('DELETE /profile/:id');
});

module.exports = router;
