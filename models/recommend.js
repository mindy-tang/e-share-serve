const mongoose = require("./db");

const RecommendSchema = mongoose.Schema({
    name: String,
    name_cn: String,
    author: String,
    reason: String,
    // referrer_id: String,
    user_name: String,
    avatar: String,
    create_time: Date,
    status: Number,
    stars: Number
});

module.exports = mongoose.model("Recommend", RecommendSchema, "recommend");