const news = require("../models/news.js");
const Review = require("../models/newsReview.js");
module.exports.postReview=async (req, res) => { //note (/news/:id/reviews) stands for "/" here
    console.log(req.body);
    let newsItem = await news.findById(req.params.id);
    let newReview = new Review(req.body.newsreview);
    newReview.author=req.user._id;
    newsItem.reviews.push(newReview);
    await newReview.save();
    await newsItem.save();
    console.log("new review added");
    res.redirect(`/news/${newsItem._id}`);
};

module.exports.destroyReview=async (req, res) => //note =>(/news/:id/reviews) stands for "/" here
{
    let { id, reviewId } = req.params;
    await news.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/news/${id}`);
};