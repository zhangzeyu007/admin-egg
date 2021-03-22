/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-03-21 21:36:32
 * @LastEditors: 海象
 * @LastEditTime: 2021-03-22 13:20:44
 */
import axios from '../http'

function getSearch(params) {
    return axios.post('/video/search', params)
}

function getVideoUrl(params) {
    return axios.post('/video/getvideourl', params)
}

export default {
    getSearch,
    getVideoUrl
}