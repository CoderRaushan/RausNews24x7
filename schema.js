const Joi = require('joi');
// module.exports.newsSchema = Joi.object({
//     news:Joi.object({
//         title: Joi.string().required(),
//         description: Joi.string().required(),
//         location: Joi.string().required(),
//         country: Joi.string().required(),
//         price: Joi.number().min(0).optional().allow(null, ''), 
//         image: Joi.string(),
//     }).required()       
// });


module.exports.newsSchema = Joi.object({
    news: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
        category: Joi.string().required().valid("Cricket", "Entertainment", "Politics", "Education"), // Add your categories here
        image: Joi.string(),
    }).required()
});

module.exports.reviewSchema = Joi.object({
    newsreview:Joi.object({
    rating:Joi.number().required().min(1).max(5),
    comment:Joi.string().required(),
    }).required()
});