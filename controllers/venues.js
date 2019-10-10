module.exports = {

    // GET /register
    getRegister(req, res, next) {
        res.render('venue/register');
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
    