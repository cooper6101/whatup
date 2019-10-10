var express = require('express');
var router = express.Router();
const { asyncErrorHandler } = require('../middleware');

// GET /venue/:id // show venue page
router.get('/:id', (req, res, next) => {
    res.send('GET /venue/:id');
  });

// GET /venue/:id/edit // show venue edit form
router.get('/:id/edit', (req, res, next) => {
    res.send('GET /venue/:id/edit');
  });

// PUT /venue/:id/ // update venue
router.put('/:id', (req, res, next) => {
    res.send('PUT /venue/:id');
  });

// DELETE /venue/:id // delete venue
router.delete('/:id', (req, res, next) => {
    res.send('DELETE /venue/:id');
  });

module.exports = router;