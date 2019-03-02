/**
 * @Author: fusy
 * @Date: 2018-08-27 20:16:49
 * -----
 * @Modified By: admin
 * @Last Modified: 2018-12-07 17:41:54
 * HISTORY:
 * Date  	By	Comments
 * ------	---	---------------------------------------------------------
 */

// webpack-merge 插件 可以继承commom配置
const merge = require('webpack-merge');     
const common = require('./webpack.config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');    // css 分离插件
const optimizeCss = require('optimize-css-assets-webpack-plugin');  // css压缩插件 webpack4不支持自动压缩css
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');          // js压缩插件

const rules = require('./config/rules')('style-loader');

module.exports = merge(common, {
    mode: 'production',
    devtool: 'none',
    output: {
        filename: 'js/[name].[chunkhash:8].bundle.js',
        chunkFilename: 'js/[name]-[id].[chunkhash:8].bundle.js'
    },
    module: {
        rules: [
            ...rules,
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    { loader: 'postcss-loader', options: { plugins: [require('autoprefixer')] } }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    { loader: 'postcss-loader', options: { plugins: [require('autoprefixer')] } },
                    { loader: 'less-loader', options: { modifyVars: require('./config/theme.js') } }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                    { loader: 'postcss-loader', options: { plugins: [require('autoprefixer')] } }
                ]
            }
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: 'commons',
                    chunks: 'initial',
                    minChunks: 2
                },
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true
                }
            }
        },
        // minimize: true,
        minimizer: [
            new optimizeCss({}),
            new UglifyJsPlugin()
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].[chunkhash:8].css'
        }),
        new optimizeCss({
            assetNameRegExp: /\.style\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: { discardComments: { removeAll: true } },
            canPrint: true
        })
    ]
});
