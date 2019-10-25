const Venue = require('../models/venue');
const Review = require('../models/review');

module.exports = {

    //POST reviews Create
    async reviewCreate(req, res, next) {
        //find venue by id
        let venue = await Venue.findById(req.params.id).populate('reviews').exec();
        let haveReviewed = venue.reviews.filter(review => {
            return review.author.equals(req.user._id);
        }).length;
        if(haveReviewed) {
            req.session.error = 'Sorry you can only review a venue one time';
            return res.redirect(`/venue/${venue.id}`);
        }
        //create review
        req.body.review.author = req.user._id;
        let review = await Review.create(req.body.review);
        //asign review to venue
        venue.reviews.push(review);
        //save the venue
        venue.save();
        //redirect to the venue
        req.session.success = "Review Created Successfully!";
        res.redirect(`/venue/${venue.id}`);
    },

    // PUT reviews Update
    async reviewUpdate(req, res, next) {
        //find review by id and update
        await Review.findByIdAndUpdate(req.params.review_id, req.body.review);
        req.session.success = 'Review Updated Successfully';
        res.redirect(`/posts/${req.params.id}`);
    },

    // DELETE reviews Destroy
    async reviewDestroy(req, res, next) {
        await Venue.findByIdAndUpdate(req.params.id, {
            $pull: { reviews: req.params.review_id }
        });
        await Review.findByIdAndRemove(req.params.review_id);
        req.session.success = 'Review Deleted Successfully';
        res.redirect(`/posts/${req.params.id}`);
    }
}