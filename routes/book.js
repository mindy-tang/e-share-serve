const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const url = require("url");
const BookModel = require("../models/book");

//查询book全列表
router.get("/list", (req, res) => {
    BookModel.find({}, (err, docs) => {
        if (err) {
            console.log("查询book全列表失败:", err);
            return;
        }
        res.send(docs);
    })
})

//根据分类查询book列表
router.get("/cate", (req, res) => {
    const cate = url.parse(req.url, true).query.cate;
    BookModel.find({ "cate": cate }, (err, docs) => {
        if (err) {
            console.log("根据分类查询book列表失败:", err);
            return;
        }
        res.send(docs);
    });
})

//根据书名模糊查询book列表
router.get("/query", (req, res) => {
    const keyword = url.parse(req.url, true).query.keyword;
    const keywordRegExp = new RegExp(keyword);
    BookModel.find({ "name": keywordRegExp }, (err, docs) => {
        if (err) {
            console.log("模糊查询book列表失败:", err);
            return;
        }
        res.send(docs);
    });
})

//根据book_id查询book详情
router.get("/detail", (req, res) => {
    const id = url.parse(req.url, true).query.id;
    console.log("id=", id);
    const sid = mongoose.Types.ObjectId(id)
    BookModel.findOne({ "_id": sid }, (err, docs) => {
        if (err) {
            console.log("模糊查询book列表失败:", err);
            return;
        }
        res.send(docs);
    })
})

//新增book
router.post("/add", (req, res) => {
    const book = new BookModel({
        ...req.body,
        create_time: Date.now()
    });
    console.log("新增的book:", book);

    book.save((err) => {
        if (err) {
            console.log("新增book失败:", err);
            return;
        }
        res.status(200).send("新增成功");
    });
})

// 编辑book
router.post("/update", (req, res) => {
        const book = req.body;
        const sid = mongoose.Types.ObjectId(book._id);
        console.log("编辑book：", book);

        BookModel.updateOne({ "_id": sid }, {...book }, (err) => {
            if (err) {
                console.log("编辑book失败:", err);
                return;
            }
            res.status(200).send("编辑成功");
        })
    })
    //根据id删除cate
router.get("/delete", (req, res) => {
    const id = url.parse(req.url, true).query.id;
    const sid = mongoose.Types.ObjectId(id);

    BookModel.findByIdAndDelete(sid, (err) => {

        if (err) {
            console.log("删除book失败:", err);
            return;
        }
        res.status(200).send("删除成功");
    })
})

module.exports = router;