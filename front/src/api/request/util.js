/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-02-23 08:32:38
 * @LastEditors: 海象
 * @LastEditTime: 2021-03-23 11:32:20
 */
import axios from '../http'

// axios({ method: "post", url: '/util/upload', data: params, headers: { "Content-Type": "multipart/form-data;charet=utf-8" } })
function upload(params, config) {
    return axios.post('/util/upload', params, config)
}

function checkFile(params) {
    return axios.post('/util/checkfile', params)
}

//  合并文件
function mergeFile(params) {
    return axios.post('/util/mergefile', params)
}

function sendEmail(params) {
    return axios.post('/util/sendemail', params)
}
export default {
    upload,
    checkFile,
    mergeFile,
    sendEmail
}