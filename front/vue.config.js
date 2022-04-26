/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-02-22 08:37:48
 * @LastEditors: 海象
 * @LastEditTime: 2021-03-21 21:34:24
 */

const path = require('path')
module.exports = {
    // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
    assetsDir: 'static',
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