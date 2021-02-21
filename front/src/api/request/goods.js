/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-02-21 12:37:49
 * @LastEditors: 海象
 * @LastEditTime: 2021-02-21 12:41:21
 */

import axios from '../http'


function upload(params) {
    return axios.post('/goods/upload', params)
}

function checkFile(params) {
    return axios.post('/goods/checkfile', params)
}

export default {
    upload,
    checkFile
}