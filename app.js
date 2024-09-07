if(process.env.NODE_ENV != "production")
{
require('dotenv').config();
}
const express = require("express");
app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsmate = require("ejs-mate");
const expressError = require("./utils/expressErrors.js");
const bodyParser = require('body-parser');
const { render } = require("ejs");
const { wrap } = require("module");
const newsRouter=require("./routes/news.js");// News is the news router ans news is schema
const reviewRouter=require("./routes/review.js");
const userRouter=require("./routes/user.js");
const session=require("express-session");
const MongoStore = require('connect-mongo');
const flash=require("connect-flash");
const passport=require("passport");
const LocalStratgy=require("passport-local");
const User=require("./models/user.js");
const dblink=process.env.ATLASDB_URL;
// Middleware to parse URL-encoded data
app.use(bodyParser.urlencoded({ extended: true }));
// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs', ejsmate);
app.use(express.static(path.join(__dirname, "/public")));
//font awesome
app.use('/static', express.static(path.join(__dirname, 'node_modules/@fortawesome/fontawesome-free')));
// Serve Bootstrap files from the "node_modules" directory
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist')));

const store= MongoStore.create({
    mongoUrl:dblink,
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter:24*3600,
});

store.on("error",(err)=>
{
    console.log("error in mongo session store",err)
});

app.use(session({
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Expire 7 days from now
        maxAge: 7 * 24 * 60 * 60 * 1000, // Valid for 7 days in milliseconds
        httpOnly: true,
    }
}));


app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStratgy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
 

// const mongo_url = "mongodb://127.0.0.1:27017/rausnews24X7";


main().then(() => {
    console.log("connected to mongodb");
}).catch((err) => {
    console.log(err);
})
async function main() {
    await mongoose.connect(dblink);
}


app.get("/", (req, res) => {
    console.log("hi");
    res.render("/newsfiles/robots.txt");
});

app.use((req, res, next) => {
    res.locals.successMsg = req.flash("success");
    res.locals.errorMsg = req.flash("error");
    res.locals.deleteMsg = req.flash("delete");
    res.locals.currUser = req.user;
    next();
});

//demo 
// app.get("/news/demo",async(req,res)=>
// {
//    let fakeUser=({
//     email:"raushankumar344@gmail.com",
//     username:"raushan@124"
//    });
//    let registerUser=await User.register(fakeUser,"raushan_234@%#*k");
//    res.send(registerUser);
// });


// importing news routes from  news.js

app.use("/news", newsRouter);
app.use("/news/:id/reviews",reviewRouter);
// app.use("/",newsRouter);
app.use("/",userRouter);

 
//error for wrong route
app.all("*", (req, res, next) => {
    next(new expressError(500, "page not found"));
});


//error middleware
app.use((err, req, res, next) => {
    const { status = 500, message = "Internal Server Error" } = err;
    // res.status(status).send(message);
    res.status(status).render("newsfiles/error.ejs", { message });
});



app.listen(8890, () => {
    console.log("port is listenning at 8890");
});