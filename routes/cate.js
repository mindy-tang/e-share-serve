const express = require("express");
const router = express.Router();
const CateModel = require("../models/cate");

//查询cate全列表
router.get("/list",(req, res)=>{
    CateModel.find({},(err, docs) => {
        if(err){
            console.log("cate全列表查询失败:",err);
            return;
        }
        console.log("查询cate全列表成功:",docs);
        res.send(docs);
    });
});

module.exports = router;