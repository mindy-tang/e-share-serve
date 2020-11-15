const express = require("express");
const router = express.Router();
const RecommendModel = require("../models/recommend");

//查询recommend全列表
router.get("/list",(req, res)=>{
    RecommendModel.find({},(err, docs) => {
        if(err){
            console.log("recommend全列表查询失败:",err);
            return;
        }
        res.send(docs);
    });
});

//新增推荐
router.post("/add", (req, res)=> {
    const recommend = new RecommendModel({
        ...req.body,
        create_time:Date.now()
    });
    console.log("新增的recommend:", recommend);
    
    recommend.save((err)=>{
        if (err) {
            console.log("新增推荐失败:",err);
            return;
        }
        res.status(200).send("新增成功");
    });
})


module.exports = router;