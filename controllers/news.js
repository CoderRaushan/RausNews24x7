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
        let upadateImgLink = updatenews.image.url;
        upadateImgLink = upadateImgLink.replace("/upload", "/upload/w_250");
        res.render("newsfiles/edit.ejs", { news: updatenews, upadateImgLink });
    }
    else {
        res.status(400).send("cannot get updatenews");
    }
};

module.exports.UpdateNews = async (req, res) => {
    if (!req.body.news) {
        throw new expressError(400, "send valid data for news");
    }
    const { id } = req.params;
    if (id) {
        let doupdatenews = await news.findByIdAndUpdate(id, { ...req.body.news });
        if (typeof req.file !== "undefined") {
            let url = req.file.path;
            let filename = req.file.filename;
            doupdatenews.image = { url, filename };
            await doupdatenews.save();
        }
        req.flash("success", "news post updated!");
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

module.exports.TrendingNews = async (req, res) => {
    const cricketnews = await news.find({ category: { $regex: 'Trending', $options: 'i' } });
    console.log(cricketnews);
    res.render("newsfiles/newsitems.ejs", { allnews: cricketnews });
}
module.exports.EntertainmentNews = async (req, res) => {
    const cricketnews = await news.find({ category: { $regex: 'Entertainment', $options: 'i' } });
    console.log(cricketnews);
    res.render("newsfiles/newsitems.ejs", { allnews: cricketnews });
}

module.exports.cricketNews = async (req, res) => {
    const cricketnews = await news.find({ category: { $regex: 'Cricket', $options: 'i' } }); // Case-insensitive search
    console.log(cricketnews);
    res.render("newsfiles/newsitems.ejs", { allnews: cricketnews });
};

module.exports.FootBallNews = async (req, res) => {
    const cricketnews = await news.find({ category: { $regex: 'FootBall', $options: 'i' } });
    console.log(cricketnews);
    res.render("newsfiles/newsitems.ejs", { allnews: cricketnews });
}

module.exports.CitiesNews = async (req, res) => {
    const cricketnews = await news.find({ category: { $regex: 'Cities', $options: 'i' } });
    console.log(cricketnews);
    res.render("newsfiles/newsitems.ejs", { allnews: cricketnews });
}
module.exports.EducationNews = async (req, res) => {
    const cricketnews = await news.find({ category: { $regex: 'Education', $options: 'i' } });
    console.log(cricketnews);
    res.render("newsfiles/newsitems.ejs", { allnews: cricketnews });
}
module.exports.WorldNewsNews = async (req, res) => {
    const cricketnews = await news.find({ category: { $regex: 'WorldNews', $options: 'i' } });
    console.log(cricketnews);
    res.render("newsfiles/newsitems.ejs", { allnews: cricketnews });
}
module.exports.ScienceNews = async (req, res) => {
    const cricketnews = await news.find({ category: { $regex: 'Science', $options: 'i' } });
    console.log(cricketnews);
    res.render("newsfiles/newsitems.ejs", { allnews: cricketnews });
}
module.exports.ElectionNews = async (req, res) => {
    const cricketnews = await news.find({ category: { $regex: 'Election', $options: 'i' } });
    console.log(cricketnews);
    res.render("newsfiles/newsitems.ejs", { allnews: cricketnews });
}
module.exports.WeatherNews = async (req, res) => {
    const cricketnews = await news.find({ category: { $regex: 'Weather', $options: 'i' } });
    console.log(cricketnews);
    res.render("newsfiles/newsitems.ejs", { allnews: cricketnews });
}
module.exports.TechnologyNews = async (req, res) => {
    const cricketnews = await news.find({ category: { $regex: 'Technology', $options: 'i' } });
    console.log(cricketnews);
    res.render("newsfiles/newsitems.ejs", { allnews: cricketnews });
}

module.exports.BusinessNews = async (req, res) => {
    const cricketnews = await news.find({ category: { $regex: 'Business', $options: 'i' } });
    console.log(cricketnews);
    res.render("newsfiles/newsitems.ejs", { allnews: cricketnews });
}
module.exports.HealthNews = async (req, res) => {
    const cricketnews = await news.find({ category: { $regex: 'Health', $options: 'i' } });
    console.log(cricketnews);
    res.render("newsfiles/newsitems.ejs", { allnews: cricketnews });
}

module.exports.SportsNews = async (req, res) => {
    const cricketnews = await news.find({ category: { $regex: 'Sports', $options: 'i' } });
    console.log(cricketnews);
    res.render("newsfiles/newsitems.ejs", { allnews: cricketnews });
}
module.exports.EnvironmentNews = async (req, res) => {
    const cricketnews = await news.find({ category: { $regex: 'Environment', $options: 'i' } });
    console.log(cricketnews);
    res.render("newsfiles/newsitems.ejs", { allnews: cricketnews });
}
 
module.exports.CrimeNews= async (req, res) => {
    const cricketnews = await news.find({ category: { $regex: 'Crime', $options: 'i' } });
    console.log(cricketnews);
    res.render("newsfiles/newsitems.ejs", { allnews: cricketnews });
}
 
module.exports.LifestyleNews = async (req, res) => {
    const cricketnews = await news.find({ category: { $regex: 'Lifestyle', $options: 'i' } });
    console.log(cricketnews);
    res.render("newsfiles/newsitems.ejs", { allnews: cricketnews });
}
 
module.exports.OpinionNews = async (req, res) => {
    const cricketnews = await news.find({ category: { $regex: 'Opinion', $options: 'i' } });
    console.log(cricketnews);
    res.render("newsfiles/newsitems.ejs", { allnews: cricketnews });
}
const path = require('path');


module.exports.sitemapNews = async (req, res) => {
    console.log("Serving sitemap.xml file");

    // Adjust the path to the correct location in the views/newsfiles folder
    const filePath = path.join(__dirname, '../views/newsfiles/sitemap.xml');
    
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error("File not found or error serving file:", err);
            res.status(404).send("Sitemap not found");
        }
    });
};




