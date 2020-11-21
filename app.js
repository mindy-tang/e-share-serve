const express = require("express");
const bodyParser = require("body-parser");
const cate = require("./routes/cate");
const book = require("./routes/book");
const recommend = require("./routes/recommend");
const comment = require("./routes/comment");
const admin = require("./routes/admin");
const app = express();

//静态资源
app.use(express.static("static"));
//第三方中间件
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//分类模块
app.use("/cate", cate);
//book模块
app.use("/book", book);
//推荐模块
app.use("/recommend", recommend);
//留言模块
app.use("/comment", comment);
//管理员模块
app.use("/api/admin", admin);




//错误处理中间件
app.use((req, res, next) => {
    res.status(404).send("404,页面找不到");
});

app.listen(3091);