const express = require("express");
const router = express.Router();
const CommentModel = require("../models/comment");

//查询comment全列表
router.get("/list",(req, res)=>{
    CommentModel.find({},(err, docs) => {
        if(err){
            console.log("留言列表查询失败:",err);
            return;
        }
        res.send(docs);
    });
});

//新增留言
router.post("/add", (req, res)=> {
    const comment = new CommentModel({
        ...req.body,
        create_time:Date.now()
    });
    comment.save((err)=>{
        if (err) {
            console.log("新增留言失败:",err);
            return;
        }
        res.status(200).send("新增成功");
    });
})


module.exports = router;