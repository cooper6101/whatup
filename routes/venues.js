var express = require('express');
var router = express.Router();
const { 
  getVenueRegister,
  postVenueRegister,
  getLogin,
  postLogin,
  getShow,
  getEdit } = require('../controllers/venues');
const { asyncErrorHandler } = require('../middleware');

// GET /venue/register // register new Venue
router.get('/register', getVenueRegister);

// POST /venue/register // create new Venue
router.post('/register', asyncErrorHandler(postVenueRegister));

// GET /venue/login
router.get('/login', getLogin);

// POST /venue/login
router.post('/login', postLogin);

// GET /venue/:id // show venue page
router.get('/:id', getShow);

// GET /venue/:id/edit // show venue edit form
router.get('/:id/edit', getEdit);

// PUT /venue/:id/ // update venue
router.put('/:id', (req, res, next) => {
    res.send('PUT /venue/:id');
  });

// DELETE /venue/:id // delete venue
router.delete('/:id', (req, res, next) => {
    res.send('DELETE /venue/:id');
  });

module.exports = router;