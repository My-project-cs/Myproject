/**
 * @Author: wys
 * @Date: 2019-03-01 15:01:09
 * -----
 * @Modified By: wys
 * @Last Modified: 2019-03-01 15:07:16
 * HISTORY:
 * Date  	By	Comments
 * ------	---	---------------------------------------------------------
 */

const Login = require('./login');
const delay = require('webpack-api-mocker/utils/delay');

const proxy = {
    ...Login
};

module.exports = delay(proxy, 1000);