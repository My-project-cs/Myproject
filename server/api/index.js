'use stitic';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');
const session = require('express-session');
const config = require('../config');

const {apiPort, apiHost, dbAdress} = config;
const app = new express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../static')));
// 设置session
app.use(session({
    secret:'express_react_cookie',
    resave: true,
    saveUninitialized:true,
    cookie: {maxAge: 60 * 1000 * 30}//过期时间
}));
// 设置跨域
app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "content-type");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    if(req.method === "OPTIONS") {
        res.send("200");
    } else {
        next();
    }
});

// 展示页面路由
app.use('/user', require('./user'));
// 管理页面路由
// app.use('/admin', require('./admin'));

mongoose.Promise = require('bluebird');
mongoose.connect(`mongodb://${dbAdress}/blog`, (err) => {
    if (err) {
        console.log(err, "数据库连接失败");
        return;
    }
    console.log('数据库连接成功');

    app.listen(apiPort, function (err) {
        if (err) {
            console.error('err:', err);
        } else {
            console.info(`===> api server is running at ${apiHost}:${apiPort}`);
        }
    });
});