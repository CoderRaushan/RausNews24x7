const express = require("express");
const router = express.Router();
const wrapAsyn = require("../utils/wrapAsync");
const passport = require("passport");
const { SaveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/users.js");

//combining (signup user) and  (signup user or login user)
router.route("/signup")
.get(userController.signupFormUser)
.post(wrapAsyn(userController.signupUser))

//combining (loginform user) and (login user)
router.route("/login")
.get(userController.loginFormRender)
.post(SaveRedirectUrl, passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: true
}), userController.loginUser);

//logout user
router.get("/logout", userController.logoutUser);

module.exports = router;

