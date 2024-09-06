const express = require("express");
const router = express.Router();
const wrapAsyn = require("../utils/wrapAsync.js");
const {isLoggedIn,isOwner,validatenews}=require("../middleware.js");
const newsController=require("../controllers/news.js");
const multer  = require('multer');
const {storage}=require("../cloud_config.js");
const upload = multer({storage});


// combining (index) route and (create post) in single router
router.route("/")
.get(wrapAsyn(newsController.index))
.post(
    isLoggedIn,
    upload.single("news[image][url]"),
    validatenews,
    wrapAsyn(newsController.createNews))//abhi ke liye validatenews middleware use nahi kar rahe hai error de raha hain infuture user karenge
// new route
router.get("/new",isLoggedIn,newsController.newsPostForm);

// cricket search raoute
router.route("/cricket")
  .get(wrapAsyn(newsController.cricketnews));

// combining (show specific place data) (update route) (delete route) in one router
router.route("/:id")
.get(wrapAsyn(newsController.newsShow))
.put(isLoggedIn,
    isOwner, 
    upload.single("news[image][url]"),
    wrapAsyn(newsController.UpdateNews))
.delete(isLoggedIn,isOwner, wrapAsyn(newsController.deleteNews))



// edit route 
router.get("/:id/edit",
    isLoggedIn,
    isOwner, 
    wrapAsyn(newsController.editFormRenderNews));

module.exports=router;