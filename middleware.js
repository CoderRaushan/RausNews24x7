const news = require("./models/news");
const Review = require("./models/newsReview.js");
const expressError = require("./utils/expressErrors.js");
const { newsSchema, reviewSchema } = require("./schema.js");
module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be logged in to do such operations");
        return res.redirect("/login");
    }
    next();
};
// save karna hai req.session.redirectUrl in locals me 

module.exports.SaveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};


module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
    let newsdata = await news.findById(id);
    if (!newsdata.owner._id.equals(res.locals.currUser._id)) {
        req.flash("error", "you are not owner of this news post!");
        return res.redirect(`/news/${id}`);
    }
    next();
};

// joi schema validation news
module.exports.validatenews = (req, res, next) => {
    const { error } = newsSchema.validate(req.body);
    if (error) {
        let errmsg = error.details.map((el) => el.message).join(",");
        throw new expressError(400, errmsg);
    }
    else {
        next();
    }
};

// joi schema  validation for reviews
module.exports.validatereview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const errmsg = error.details.map((el) => el.message).join(",");
        throw new expressError(400, errmsg);
    } else {
        next();
    }
};

module.exports.isReviewAuthor = async (req, res, next) => {
    let { id, reviewId } = req.params;
    let reviewdata = await Review.findById(reviewId);
    if (!reviewdata.author.equals(res.locals.currUser._id)) {
        req.flash("error", "you are not Author of this review!");
        return res.redirect(`/news/${id}`);
    }
    next();
};
