const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const url = require("url");
const BookModel = require("../models/book");

//查询book全列表
router.get("/list",(req,res)=>{
    BookModel.find({},(err, docs)=>{
        if(err){
            console.log("查询book全列表失败:", err);
            return;
        }
        res.send(docs);
    })
})

//根据分类查询book列表
router.get("/cate",(req, res)=>{
    const cate = url.parse(req.url,true).query.cate;
    BookModel.find({"cate":cate},(err, docs) => {
        if(err){
            console.log("根据分类查询book列表失败:", err);
            return;
        }
        res.send(docs);
    });
})

//根据书名模糊查询book列表
router.get("/query",(req, res)=>{
    const keyword = url.parse(req.url,true).query.keyword;
    const keywordRegExp = new RegExp(keyword);
    BookModel.find({"name":keywordRegExp},(err, docs) => {
        if(err){
            console.log("模糊查询book列表失败:", err);
            return;
        }
        res.send(docs);
    });
})

//根据book_id查询book详情
router.get("/detail", (req,res)=>{
    const id = url.parse(req.url,true).query.id;
    console.log("id=",id);
    const sid = mongoose.Types.ObjectId(id)
    BookModel.findOne({"_id":sid}, (err, docs) => {
        if(err){
            console.log("模糊查询book列表失败:", err);
            return;
        }
        res.send(docs);
    })
})

//新增book
router.post("/add", (req, res)=> {
    const book = new BookModel({
        ...req.body,
        create_time:Date.now()
    });
    console.log("新增的book:", book);
    
    book.save((err)=>{
        if (err) {
            console.log("新增book失败:",err);
            return;
        }
        res.status(200).send("新增成功");
    });
})

//修改book

module.exports = router;