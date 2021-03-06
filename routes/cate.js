const express = require("express");
const router = express.Router();
const url = require("url");
const mongoose = require("mongoose");
const CateModel = require("../models/cate");

//查询cate全列表
router.get("/list", (req, res) => {
    CateModel.find({}, (err, docs) => {
        if (err) {
            console.log("cate全列表查询失败:", err);
            return;
        }
        docs.sort((a, b) => a.no - b.no);
        res.send(docs);
    });
});

//根据名称模糊查询cate列表
router.get("/query", (req, res) => {
    const keyword = url.parse(req.url, true).query.keyword;
    const keywordRegExp = new RegExp(keyword);
    CateModel.find({ "name": keywordRegExp }, (err, docs) => {
        if (err) {
            console.log("模糊查询cate列表失败:", err);
            return;
        }
        docs.sort((a, b) => a.no - b.no);
        res.send(docs);
    });
})

//新增cate
router.post("/add", (req, res) => {
        const cate = new CateModel({
            ...req.body,
            create_time: Date.now()
        });

        cate.save((err) => {
            if (err) {
                console.log("新增cate失败:", err);
                return;
            }
            res.status(200).send("新增成功");
        });
    })
    //编辑cate
router.post("/update", (req, res) => {
        const cate = req.body;
        const sid = mongoose.Types.ObjectId(cate._id);

        CateModel.update({ "_id": sid }, {...cate }, (err) => {
            if (err) {
                console.log("编辑cate失败:", err);
                return;
            }
            res.status(200).send("编辑成功");
        })
    })
    //根据id删除cate
router.get("/delete", (req, res) => {
    const id = url.parse(req.url, true).query.id;
    const sid = mongoose.Types.ObjectId(id);

    CateModel.findByIdAndDelete(sid, (err) => {

        if (err) {
            console.log("删除cate失败:", err);
            return;
        }
        res.status(200).send("删除成功");
    })
})

module.exports = router;