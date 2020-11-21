const express = require("express");
const router = express.Router();
const url = require("url");
const mongoose = require("mongoose");
const AdminModel = require("../models/admin");
const JwtUtil = require("../utils/jwtUtil");

//查询用户全列表
router.get("/list", (req, res) => {
    AdminModel.find({}, (err, docs) => {
        if (err) {
            console.log("admin全列表查询失败:", err);
            return;
        }
        res.send(docs);
    });
});

//验证登录
router.post("/login", (req, res) => {
    const param = req.body;
    AdminModel.findOne({ "account": param.account, "passport": param.passport }, (err, docs) => {
        if (err) {
            res.send({ msg: '账号或密码错误' });
            return;
        }
        //登录成功
        //通过用户_id生成token
        console.log("login_docs:", docs);

        const jwt = new JwtUtil(docs._id);
        const token = jwt.generateToken();
        res.status(200).send({ msg: '登录成功', token: token });
    });
})

//新增用户
router.post("/add", (req, res) => {
        const cate = new AdminModel({
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
    //编辑用户
router.post("/update", (req, res) => {
        const cate = req.body;
        const sid = mongoose.Types.ObjectId(cate._id);

        AdminModel.update({ "_id": sid }, {...cate }, (err) => {
            if (err) {
                console.log("编辑cate失败:", err);
                return;
            }
            res.status(200).send("编辑成功");
        })
    })
    //根据id删除用户
router.get("/delete", (req, res) => {
    const id = url.parse(req.url, true).query.id;
    const sid = mongoose.Types.ObjectId(id);

    AdminModel.findByIdAndDelete(sid, (err) => {

        if (err) {
            console.log("删除cate失败:", err);
            return;
        }
        res.status(200).send("删除成功");
    })
})

module.exports = router;