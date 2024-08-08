const express = require("express");
app = express();
const mongoose = require("mongoose");
const news = require("./models/news.js");
const path = require("path");
const methodOverride=require("method-override");
const ejsmate=require("ejs-mate");
const wrapAsyn=require("./utils/wrapAsync.js");
const expressError=require("./utils/expressErrors.js");
const bodyParser = require('body-parser');
const { render } = require("ejs");
const {newsSchema}=require("./schema.js");

// Middleware to parse URL-encoded data
app.use(bodyParser.urlencoded({ extended: true }));
// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));  
app.engine('ejs',ejsmate);
app.use(express.static(path.join(__dirname,"/public")));
//font awesome
app.use('/static', express.static(path.join(__dirname, 'node_modules/@fortawesome/fontawesome-free')));
// Serve Bootstrap files from the "node_modules" directory
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist')));
const mongo_url = "mongodb://127.0.0.1:27017/rausnews24X7";

main().then(() => {
    console.log("connected to mongodb");
}).catch((err) => {
    console.log(err);
})
async function main() {
    await mongoose.connect(mongo_url);
}

app.get("/", (req, res) => 
{
    res.send("root page");
})


// joi schema  validation 
const validatenews=(req,res,err)=>
{
    let{error}=newsSchema.validate(req.body);
    if(error)
    {
        let errmsg=error.details.map((el)=>el.message).join(",");
        throw new expressError(400,errmsg);
    }
    else 
    {
        next();
    }
}

app.get("/news", wrapAsyn(async (req, res) => 
{
    let allnews = await news.find({});
    res.render("newsfiles/index.ejs", { allnews });
}));
// new route
app.get("/news/new",(req,res)=>
{
    res.render("newsfiles/new.ejs");
});

//show specific place data    
app.get("/news/:id", wrapAsyn(async (req, res) => 
    {
    let { id } = req.params;
        const newsItem = await news.findById(id);
        if (newsItem) 
        {
            res.render("newsfiles/show.ejs", { news: newsItem });
        }
        else 
        {
            res.status(404).send("cannot get newsItem:");
        }
    }
));

// create post 
app.post("/news",wrapAsyn(async(req,res,next)=>
{  
    const newnews= new news(req.body.news);
    if(newnews)
    {
       await newnews.save();
       console.log("data saved successfully");
       res.redirect("/news");
    }
    else
    {
        res.status(400).send("cannot get newnews");
    }
}));
// edit route
app.get("/news/:id/edit",wrapAsyn(async(req,res)=>
{
    let {id}=req.params;
       if(id)
       {
        const updatenews=await news.findById(id);
        res.render("newsfiles/edit.ejs",{news:updatenews});
       }
       else
       {
        res.status(400).send(" cannot get updatenews");
       }
}));

//update route
app.put("/news/:id",wrapAsyn(async(req,res)=>
{
    if(!req.body.news)
    {
        throw new expressError(400,"send valid data for news");
    }
    const {id}=req.params;
    if(id)
    {
        await news.findByIdAndUpdate(id,{ ...req.body.news});
        console.log("updated successfully")
        res.redirect(`/news/${id}`)
    }
    else 
    {
        console.log("cannot get id");
        res.status(400).send(err);
    }
}));
//delete route
app.delete("/news/:id",wrapAsyn(async(req,res)=>
{
    const {id}=req.params;
        if(id)
        {
            console.log("about to delete");
            console.log(id);
            const deletedNews= await news.findByIdAndDelete(id);
            console.log("deleted successfully",deletedNews);
            res.redirect("/news");
        }
        else 
        {
            console.log("cannot get id to delete data ");
            res.status(400).send(err);
        }
}));
//error for wrong route
app.all("*",(req,res,next)=>
{
    next(new expressError(500,"page not found"));
})
//error middleware
app.use((err,req,res,next)=>
{
 const {status=500,message="Internal Server Error"}=err;
//  res.status(status).send(message);
    res.status(status).render("newsfiles/error.ejs",{message});
});

app.listen(8890, () => 
{
    console.log("port is listenning at 8890");
});