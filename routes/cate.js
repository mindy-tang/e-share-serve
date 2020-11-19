const express = require("express");
const router = express.Router();
const CateModel = require("../models/cate");

//查询cate全列表
router.get("/list", (req, res) => {
    CateModel.find({}, (err, docs) => {
        if (err) {
            console.log("cate全列表查询失败:", err);
            return;
        }
        res.send(docs);
    });
});

//新增cate
router.post("/add", (req, res) => {
    const cate = new CateModel({
        ...req.body,
        create_time: Date.now()
    });
    console.log("新增的cate:", cate);

    cate.save((err) => {
        if (err) {
            console.log("新增cate失败:", err);
            return;
        }
        res.status(200).send("新增成功");
    });
})

module.exports = router;