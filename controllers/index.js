

module.exports = {
    // GET /
    getIndex(req, res, next) {
        res.render('index');
    },

    // GET /register
    getRegister(req, res, next) {
        res.render('profile/register');
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