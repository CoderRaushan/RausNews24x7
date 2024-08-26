const express = require("express");
const router = express.Router({mergeParams:true});//mergeParams:true to send all data form app.js to reviews.js file 
const wrapAsyn = require("../utils/wrapAsync.js");
const news = require("../models/news.js");
const { validatereview,isLoggedIn, isReviewAuthor} = require("../middleware.js");
const reviewController=require("../controllers/reviews.js");
// post review route 
router.post("/",isLoggedIn, validatereview, wrapAsyn(reviewController.postReview));

// Delete review route 
router.delete("/:reviewId",isLoggedIn,isReviewAuthor, wrapAsyn(reviewController.destroyReview));

module.exports = router;