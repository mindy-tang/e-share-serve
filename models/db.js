const mongoose = require("mongoose");

const _URL = "mongodb://127.0.0.1:27017/eshare";

mongoose.connect(_URL,{useNewUrlParser: true, useUnifiedTopology: true},(err)=>{
    if(err){
        console.log("connect失败:",err);
        return;
    }
    console.log("连接成功");
});

module.exports = mongoose;