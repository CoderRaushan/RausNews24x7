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


// Trending search route
router.route("/Trending")
  .get(wrapAsyn(newsController.TrendingNews));
//Entertainment search route
router.route("/Entertainment")
  .get(wrapAsyn(newsController.EntertainmentNews));
// cricket search route
router.route("/Cricket")
  .get(wrapAsyn(newsController.cricketNews));
//FootBall search route
router.route("/FootBall")
  .get(wrapAsyn(newsController.FootBallNews));
//Cities search route
router.route("/Cities")
  .get(wrapAsyn(newsController.CitiesNews));
//Education search route
router.route("/Education")
  .get(wrapAsyn(newsController.EducationNews));
//WorldNews search route
router.route("/WorldNews")
  .get(wrapAsyn(newsController.WorldNewsNews));
//Science search route
router.route("/Science")
  .get(wrapAsyn(newsController.ScienceNews));
//Election search route
router.route("/Election")
  .get(wrapAsyn(newsController.ElectionNews));
//Weather search route
router.route("/Weather")
  .get(wrapAsyn(newsController.WeatherNews));
//Technology search route
router.route("/Technology")
.get(wrapAsyn(newsController.TechnologyNews));
// ,"","","","","","",""
//Business search route
router.route("/Business")
.get(wrapAsyn(newsController.BusinessNews));
//Health search route
router.route("/Health")
.get(wrapAsyn(newsController.HealthNews));
//Sports search route
router.route("/Sports")
.get(wrapAsyn(newsController.SportsNews));
//Environment search route
router.route("/Environment")
.get(wrapAsyn(newsController.EnvironmentNews));
//Crime search route
router.route("/Crime")
.get(wrapAsyn(newsController.CrimeNews));
//Lifestyle search route
router.route("/Lifestyle")
.get(wrapAsyn(newsController.LifestyleNews));
//Opinion search route
router.route("/Opinion")
.get(wrapAsyn(newsController.OpinionNews));

//for sitemap route
router.route("/sitemap")
.get(wrapAsyn(newsController.sitemapNews));
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