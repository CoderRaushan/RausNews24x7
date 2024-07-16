const mongoose=require("mongoose");
const newsdata=require("./data.js"); 
const news=require("../models/news.js");

const mongo_url="mongodb://127.0.0.1:27017/rausnews24X7";
 
main().then(()=>
{
    console.log("connected to mongodb");
}).catch((err)=>
{
    console.log(err);
})
async function main()
{
    await mongoose.connect(mongo_url);
}


const newsdb=async()=>
{
    await news.deleteMany({});  
    console.log("data delete successfully ");
    await news.insertMany(newsdata);
    console.log("data insert successfully ");
}
newsdb();