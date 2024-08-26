const { string } = require("joi");
const mongoose = require("mongoose");
const Review=require("./newsReview.js")
const Schema=mongoose.Schema;
const newsschema=new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        url:String,
        filename:String,
    },
    price: Number,
    location: String,
    country: String,
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"newsReview",
        }
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User", 
    }
});


newsschema.post("findOneAndDelete", async function (news) 
{
    console.log("findOneAndDelete middleware triggered");
    console.log(news);
    if (news) 
    {
        console.log("Associated Reviews IDs to delete:", news.reviews);
        await Review.deleteMany({ _id: { $in: news.reviews } });
        console.log("Associated reviews deleted successfully");
    }
});

const news=mongoose.model("news",newsschema);

module.exports=news;