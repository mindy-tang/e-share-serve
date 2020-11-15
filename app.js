const express = require("express");
const bodyParser = require("body-parser");
const cate = require("./routes/cate");
const book = require("./routes/book");
const app = express();

//静态资源
app.use(express.static("static"));
//第三方中间件
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//分类模块
app.use("/cate",cate);
//book模块
app.use("/book",book);



//错误处理中间件
app.use((req, res, next)=>{
    res.status(404).send("404,页面找不到");
});

app.listen(3091);