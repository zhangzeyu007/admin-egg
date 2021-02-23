/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-02-23 08:32:38
 * @LastEditors: 海象
 * @LastEditTime: 2021-02-23 13:22:19
 */
import axios from '../http'

// axios({ method: "post", url: '/util/upload', data: params, headers: { "Content-Type": "multipart/form-data;charet=utf-8" } })
function upload(params) {
    return axios.post('/util/upload', params)
}

function checkFile(params) {
    return axios.post('/util/checkfile', params)
}

export default {
    upload,
    checkFile
}