/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-03-21 21:36:32
 * @LastEditors: 海象
 * @LastEditTime: 2021-03-22 14:35:48
 */
import axios from '../http'

function getSearch(params) {
    return axios.post('/video/search', params)
}

function getVideoSourse(params) {
    return axios.post('/video/getvideosourse', params)
}

export default {
    getSearch,
    getVideoSourse
}