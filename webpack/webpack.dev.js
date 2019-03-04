/**
 * @Author: fusy
 * @Date: 2018-08-27 20:16:49
 * -----
 * @Modified By: wys
 * @Last Modified: 2019-03-01 17:19:01
 * HISTORY:
 * Date  	By	Comments
 * ------	---	---------------------------------------------------------
 */

const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');     // webpack-merge 插件 可以继承commom配置
const apiMocker = require('webpack-api-mocker');

const common = require('./webpack.config');
const rules = require('./config/rules')('style-loader');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'source-map', // enum
    module: {
        rules: rules
    },
    devServer: {
        contentBase : common.output.path,
        compress: true,
        port: '8081',
        hot: true,
        before(app) {
            apiMocker(app, path.resolve(__dirname, '../mock/index.js'));
        }
    },
    // 热更新使用插件
    plugins: [new webpack.HotModuleReplacementPlugin()]
});