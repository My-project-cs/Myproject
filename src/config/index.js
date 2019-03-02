/**
 * @Author: fusy
 * @Date: 2018-08-28 23:28:43
 * -----
 * @Modified By: wys
 * @Last Modified: 2019-03-01 11:51:07
 * HISTORY:
 * Date  	By	Comments
 * ------	---	---------------------------------------------------------
 */
// const ENV = 'dev'; //sit|uat|pro|dev
let envConfig;
switch (process.env.ENV) {
    case 'sit':
        envConfig = 'sitConfig';
        break;
    case 'uat':
        envConfig = 'uatConfig';
        break;
    case 'pro':
        envConfig = 'proConfig';
        break;
    default:
        envConfig = 'devConfig';
        break;
}

module.exports = {
    ...require(`./${envConfig}.js`)
};
