const mongoose = require("./db");

const BookShema = mongoose.Schema({
    // _id: {
    //     type:String,
    //     // index:true
    // }, 
    name: {
        type: String,
        // index:true
    },
    name_cn: String,
    author: {
        type: String,
        default: "佚名"
    },
    cover: String,
    introduction: String,
    addr: String,
    cate: Number,
    tags: String,
    creator_id: Number,
    creator_name: String,
    updater_id: Number,
    updater_name: String,
    create_time: Date,
    update_time: Date,
    status: {
        type: Number,
        default: 1
    },
    pics: String
});

module.exports = mongoose.model("Book", BookShema, "book");