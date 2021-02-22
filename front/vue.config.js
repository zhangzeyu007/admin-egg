/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-02-22 08:37:48
 * @LastEditors: 海象
 * @LastEditTime: 2021-02-22 09:13:32
 */

module.exports = {
    configureWebpack: config => {
        config.module.rules.push({
            test: /\.worker.js$/,
            use: {
                loader: 'worker-loader',
                options: { inline: true, name: 'workerName.[hash].js' }
            }
        })
    },
    parallel: false,
    chainWebpack: config => {
        config.output.globalObject('this')
    }
}