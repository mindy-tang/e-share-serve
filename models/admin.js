const mongoose = require("./db");

const AdminSchema = mongoose.Schema({
    // _id: String,
    account: String,
    passport: String
});

module.exports = mongoose.model("Admin", AdminSchema, "admin");