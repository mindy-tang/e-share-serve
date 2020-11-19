const mongoose = require("./db");

const CateSchema = mongoose.Schema({
    // _id: String,
    name: String,
    no: Number
});

module.exports = mongoose.model("Cate", CateSchema, "cate");