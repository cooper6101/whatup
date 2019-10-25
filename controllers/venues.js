const Venue = require('../models/venue');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const geocodingClient = mbxGeocoding({ accessToken: process.env.MAPBOX_TOKEN });
const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'whatup-llc',
    api_key: '636321972833769',
    api_secret: process.env.CLOUDINARY_SECRET
});

module.exports = {

    // GET /register
    getVenueRegister(req, res, next) {
        res.render('venue/register');
    },

    // POST /venue
    async postVenueRegister(req, res, next) {
        req.body.venue.images = []; 
        for(const file of req.files) {
            let image = await cloudinary.v2.uploader.upload(file.path);
            req.body.venue.images.push({
                url: image.secure_url,
                public_id: image.public_id
            });
        }
        let response = await geocodingClient
        .forwardGeocode({
            query: req.body.venue.location,
            limit: 1
        })
        .send();
        //use req.body to create a new post
        req.body.venue.geometry = response.body.features[0].geometry; 
        let venue = new Venue(req.body.venue);
        venue.properties.description = `<strong><a href="/venue/${venue._id}">${venue.title}</a></strong><p>${venue.location}</p><p>${venue.description.substring(0, 20)}...</p>`;
            await venue.save();
        req.session.success = 'Venue created successfully!';
        res.redirect(`/venue/${venue.id}`);
    },

    // GET /login
    getLogin(req, res, next) {
        res.render('venue/login');
    },

    // POST /login
    postLogin(req, res, next) {
        passport.authenticate('local', 
    { 
        successRedirect: '/',
        failureRedirect: '/login' 
    })(req, res, next);
    },

    // GET /venue/:id
    async getShow(req, res, next) {
        //find venue by id
        let venue = await Venue.findById(req.params.id).populate({
            path: 'reviews',
            options: { sort: { '_id': -1 }},
            populate: {
                path: 'author',
                model: 'User'
            }
        });
        const floorRating = venue.calculateAvgRating();
        res.render('venue/show', { venue, floorRating });
    },

    // GET /venue/:id/edit
    async getEdit(req, res, next) {
        let venue = await Venue.findById(req.params.id);
        res.render('venue/edit', { venue });
      },

    // PUT /venue/:id  
    async putEdit(req, res, next) {
        let venue = await Venue.findById(req.params.id);
            //   check if there's any images for deletion
    if (req.body.deleteImages && req.body.deleteImages.length) {
        // assign deletImages from req.body to its own variable
        let deleteImages = req.body.deleteImages;
        // loop over deleteImages
        for(const public_id of deleteImages) {
            // delete images from cloudinary
            await cloudinary.v2.uploader.destroy(public_id);
            // delete image from venue.images
            for (const image of post.images) {
                if (image.public_id === public_id) {
                    let index = venue.images.indexOf(image);
                    venue.images.splice(index, 1);
                }
            }
        }
    }
    // check if there are any new images for upload
    if (req.files) {
        // upload images        
        for(const file of req.files) {
            let image = await cloudinary.v2.uploader.upload(file.path);
            // add images to venue.images array
            venue.images.push({
                url: image.secure_url,
                public_id: image.public_id
            });
        }        
    }
    //check if location was updated
    if (req.body.post.location !== post.location) {
        let response = await geocodingClient
        .forwardGeocode({
            query: req.body.post.location,
            limit: 1
        })
        .send();
        post.geometry = response.body.features[0].geometry;
        post.location = req.body.post.location;
    }
        //update the venue with any new properties
        venue.title = req.body.venue.title;
        venue.hours = req.body.venue.hours;
        venue.description = req.body.venue.description;
        venue.specials = req.body.venue.specials;
        venue.events = req.body.venue.events;

        //save the updates to db
        venue.save();
        // success message
        req.session.success = 'Venue updated successfully!';
        // redirect to show page
        res.redirect(`/venue/${venue.id}`);
    },

        // DELETE venues destroy /venue/:id
        async postDestroy(req, res, next) {
            let venue = await Venue.findById(req.params.id);
            for(const image of venue.images) {
                await cloudinary.v2.uploader.destroy(image.public_id);
            }
            await venue.remove();
            req.session.success = "venue Deleted Successfully";
            res.redirect('/');
        }
}
    