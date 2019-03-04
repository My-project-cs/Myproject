const Express = require('express');
const router = Express.Router();

const User = require('../models/user');
const {MD5_SUFFIX, responseClient, md5} = require('../util');

// 用户登录
router.post('/login', (req, res) => LoginInfo(req, res));

// 用户注册
router.post('/register', (req, res) => registerInfo(req, res));

//用户验证
router.post('/userInfo', (req,res) => {
    const { userInfo } = req.session.userInfo;
    userInfo ? responseClient(res,200,0,'',userInfo) : responseClient(res,200,1,'请重新登录',userInfo);
});

// 用户注销
router.post('/logout', (req, res) => {
    req.session.destroy();
    // responseClient(res,200,0,'成功注销');
    res.redirect('/success');
});

// 登录逻辑处理
const LoginInfo = async (req, res) => {
    let {username, password} = req.body;
    let data = {};
    if (!username) return responseClient(res, 200, 2, '用户名不可为空');
    if (!password) return responseClient(res, 200, 2, '密码不可为空');
    let userInfo = await User.findOne({
        username,
        password: md5(password + MD5_SUFFIX)
    });
    if(!userInfo) return responseClient(res, 200, 1, '用户名密码错误');
    //登录成功
    data.username = userInfo.username;
    data.userType = userInfo.type;
    data.userId = userInfo._id;
    //登录成功后设置session
    req.session.userInfo = data;

    responseClient(res, 200, 0, '登录成功', data);
};

// 注册逻辑处理
const registerInfo = async (req, res) => {
    let {username, password, passwordRe} = req.body;
    if (!username) return responseClient(res, 200, 2, '用户名不可为空');
    if (!password) return responseClient(res, 200, 2, '密码不可为空');
    if (password !== passwordRe) return responseClient(res, 200, 2, '两次密码不一致');
    //验证用户是否已经在数据库中
    let data = await User.findOne({
        username: username
    });
    if(data) return responseClient(res, 200, 1, '用户名已存在');
    //保存到数据库
    let user = new User({
        username: username,
        password: md5(password + MD5_SUFFIX),
        type: 'user'
    });
    await user.save();
    let userInfo = await User.findOne({
        username: username
    });
    let registerdata = {};
    registerdata.username = userInfo.username;
    registerdata.userType = userInfo.type;
    registerdata.userId = userInfo._id;
    responseClient(res, 200, 0, '注册成功', registerdata);
};

module.exports = router;