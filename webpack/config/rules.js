/**
 * @Author: fusy
 * @Date: 2018-11-06 17:03:18
 * -----
 * @Modified By: wys
 * @Last Modified: 2019-03-01 11:49:52
 * HISTORY:
 * Date  	By	Comments
 * ------	---	---------------------------------------------------------
 */

const rules = function(loader) {
    const cssLoaders = [
        'css-loader',
        {
            loader: 'postcss-loader',
            options: {
                plugins: [
                    require('postcss-flexbugs-fixes'),
                    require('autoprefixer')({
                        browsers: [
                            '>1%',
                            'last 4 versions',
                            'Firefox ESR',
                            'not ie < 9' // React doesn't support IE8 anyway
                        ],
                        flexbox: 'no-2009'
                    }),
                    // 移动端px2rem
                    // require('postcss-px2rem-exclude')({
                    //     remUnit: 37.5,
                    //     baseDpr: 2,
                    //     exclude: /node_modules/i
                    // })
                ],
                options: {
                    sourceMap: false
                }
            }
        }
    ];
    loader && cssLoaders.unshift(loader);
    return [
        {
            test: /\.css$/,
            use: cssLoaders
        },
        {
            test: /\.less$/,
            use: [...cssLoaders, { loader: 'less-loader', options: { modifyVars: require('./theme.js') } }]
        }
    ];
};

module.exports = rules;
