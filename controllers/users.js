const User = require("../models/user.js");
module.exports.signupFormUser = (req, res) => {
    res.render("Users/SignUp.ejs");
};

module.exports.signupUser = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({
            email, username
        });
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        // register ke saath saath user ko login bhi kar rahe hai
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            else {
                req.flash("success", "welcome to RausNews24x7");
                res.redirect("/news");
            }
        });
    }
    catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};

module.exports.loginFormRender = (req, res) => {
    res.render("Users/login.ejs");
};

module.exports.loginUser = async (req, res) => {
    req.flash("success", "You are logged in");
    let redirectUrl = res.locals.redirectUrl || "/news";
    res.redirect(redirectUrl);
};

module.exports.logoutUser = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        else {
            req.flash("success", "you are logged out!");
            res.redirect("/news");
        }
    });
};
