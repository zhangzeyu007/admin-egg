/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-02-22 08:37:48
 * @LastEditors: 海象
 * @LastEditTime: 2021-03-20 08:50:28
 */

const path = require('path')
module.exports = {
    configureWebpack: config => {
        config.module.rules.push(
            {
                test: /\.worker.js$/,
                use: {
                    loader: 'worker-loader',
                    options: { inline: true, name: 'workerName.[hash].js' }
                }
            },
        )
    },
    parallel: false,
    chainWebpack: config => {
        config.output.globalObject('this')
    },
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: [
                path.resolve(__dirname, './src/assets/common/global.less')
            ]
        }
    }
}