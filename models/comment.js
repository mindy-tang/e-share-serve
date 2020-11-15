const mongoose = require("./db");

const CommentSchema = mongoose.Schema({
    user_id: String,
    user_name: String,
    content: String,
    create_time: Date,
    refer_id: String,
    refer_user_name: String
});

module.exports = mongoose.model("Comment", CommentSchema, "comment");