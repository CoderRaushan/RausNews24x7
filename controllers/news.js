    const news = require("../models/news.js");
    const expressError = require("../utils/expressErrors.js");
    module.exports.index = async (req, res) => {
        let allnews = await news.find({});
        res.render("newsfiles/index.ejs", { allnews });
    };

    module.exports.newsPostForm = (req, res) => {
        if (!req.isAuthenticated()) {
            req.flash("error", "You must be logged in to create news post!");
            res.redirect("/login");
        }
        else {
            res.render("newsfiles/new.ejs");
        }
    };

    module.exports.newsShow = async (req, res) => {
        let { id } = req.params;
        const newsItem = await news.findById(id).populate({
            path: "reviews",
            populate:
            {
                path: "author"
            },
        }).populate("owner");

        if (newsItem) {
            res.render("newsfiles/show.ejs", { news: newsItem });
        }
        else {
            req.flash("error", "Post you requested for does not exists!");
            res.redirect("/news");
        }
        console.log(newsItem);
    };

    module.exports.createNews = async (req, res, next) => {
        let url = req.file.path;
        let filename = req.file.filename;
        const newnews = new news(req.body.news);
        if (newnews) {
            newnews.owner = req.user._id;
            newnews.image = { url, filename };
            await newnews.save();
            console.log("data saved successfully");
            req.flash("success", "New Post Created!");
            res.redirect("/news");
        }
        else {
            res.status(400).send("cannot get newnews");
        }
    };

    module.exports.editFormRenderNews = async (req, res) => {
        let { id } = req.params;
        if (id) {
            const updatenews = await news.findById(id);
            let upadateImgLink= updatenews.image.url;
            upadateImgLink=upadateImgLink.replace("/upload","/upload/w_250");
            res.render("newsfiles/edit.ejs", { news: updatenews, upadateImgLink});
        }
        else {
            res.status(400).send(" cannot get updatenews");
        }
    };

    module.exports.UpdateNews = async (req, res) => {
        if (!req.body.news) {            throw new expressError(400, "send valid data for news");
        }
        const { id } = req.params;
        if (id) {
            let doupdatenews = await news.findByIdAndUpdate(id, { ...req.body.news });
            if (typeof req.file !=="undefined") 
            {
                let url = req.file.path;
                let filename = req.file.filename;
                doupdatenews.image = { url, filename };
                await doupdatenews.save();
            }
            req.flash("success","news post updated!");
            res.redirect(`/news/${id}`)
        }
        else {
            console.log("cannot get id");
            res.status(400).send(err);
        }
    };

    module.exports.deleteNews = async (req, res) => {
        const { id } = req.params;
        if (id) {
            console.log("about to delete");
            console.log(id);
            const deletedNews = await news.findByIdAndDelete(id);
            console.log("deleted successfully", deletedNews);
            req.flash("delete", "Post Is Deleted");
            res.redirect("/news");
        }
        else {
            console.log("cannot get id to delete data ");
            res.status(400).send(err);
        }
    };

    module.exports.cricketnews = async (req, res) => {
        const cricketnews = await news.find({ category: { $regex: 'Cricket', $options: 'i' } }); // Case-insensitive search
        console.log(cricketnews);
        res.render("newsfiles/cricket.ejs", { news: cricketnews });
    };