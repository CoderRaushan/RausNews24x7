const mongoose = require("mongoose");
const newsdata = require("./data.js"); 
const news = require("../models/news.js");

const mongo_url = "mongodb://127.0.0.1:27017/rausnews24X7";

main().then(() => {
    console.log("connected to mongodb");
}).catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect(mongo_url);
}

const newsdb = async () => {
    await news.deleteMany({});
    console.log("data deleted successfully");
    if (newsdata) 
    {
        const updatedData = newsdata.map((obj) => ({
            ...obj,
            owner: "66c6f56f96ce0d93d786a88a"
        }));
        await news.insertMany(updatedData);
        console.log("data inserted successfully");
    } 
    else 
    {
        console.error("newsdata.data is not an array or is undefined");
    }
};

newsdb();
