/**
 * @Author: fusy
 * @Date: 2018-08-27 20:16:49
 * -----
 * @Modified By: wys
 * @Last Modified: 2019-03-01 11:18:54
 * HISTORY:
 * Date  	By	Comments
 * ------	---	---------------------------------------------------------
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');   // html文件打包
const SpritesmithPlugin = require('webpack-spritesmith');   // 雪碧图

const INPUTPATH = path.resolve(__dirname, '../src/index.js');
const OUTPATH = path.join(__dirname, '../static');
const HTML = path.resolve(__dirname, '../index/index.html');

module.exports = {
    entry: INPUTPATH,
    output: {
        path: OUTPATH, // string
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader' //babel 的运行时配置放在 .babelrc 里
            },
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader',
                exclude: /(node_modules)/,
                options: {
                    limit: 10000,
                    minetype: 'application/font-woff'
                }
            },
            {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader',
                exclude: /(node_modules)/,
                options: {
                    limit: 10000,
                    minetype: 'application/font-woff'
                }
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                exclude: /(node_modules)/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    minetype: 'application/octet-stream'
                }
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                exclude: /(node_modules)/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    minetype: 'application/vnd.ms-fontobject'
                }
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                exclude: /(node_modules)/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    minetype: 'image/svg+xml',
                    outputPath: 'image'
                }
            },
            {
                test: /\.(png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/i,
                exclude: /(node_modules)/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    outputPath: 'image'
                }
            }
        ]
    },
    resolve: {
        modules: ['node_modules', path.resolve(__dirname, 'src')],
        extensions: ['.js', '.json', '.jsx', '.css', '.scss', '.less'],
        alias: {
            image: path.resolve(__dirname, '../src/resources/image/'),
            components: path.resolve(__dirname, '../src/components')
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: HTML
        }),
        new SpritesmithPlugin({
            // 目标小图标
            src: {
                cwd: path.resolve(__dirname, '../src/resources/image/'),
                glob: '*.png'
            },
            // 输出雪碧图文件及样式文件
            target: {
                image: path.resolve(__dirname, '../static/images/sprite.png'),
                css: path.resolve(__dirname, '../static/css/sprite.css')
            },
            // 样式文件中调用雪碧图地址写法
            apiOptions: {
                cssImageRef: '../images/sprite.png'
            },
            spritesmithOptions: {
                algorithm: 'top-down'
            }
            // 作者：金字笙调
            // 链接：https://www.jianshu.com/p/c1b1dab75277
            // 來源：简书
            // 简书著作权归作者所有，任何形式的转载都请联系作者获得授权并注明出处。
        })
    ]
};
