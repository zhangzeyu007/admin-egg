/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-01-24 15:52:03
 * @LastEditors: 海象
 * @LastEditTime: 2021-02-12 10:11:45
 */

import axios from '../http'

function Login(url, params) {
    return axios.post('/user' + url, params)
}

function getCaptcha() {
    return axios.get('/user/captcha')
}

function addUser(params) {
    return axios.post('/user/adduser', params)
}

function getUserList(params) {
    return axios.post('/user/getuserlist', params)
}
function delUser(params) {
    return axios.post('/user/deluser', params)
}

function updateUser(params) {
    return axios.post('/user/updateuser', params)
}

function searchUser(params) {
    return axios.post('/user/searchuser', params)
}

export default {
    searchUser,
    updateUser,
    addUser,
    delUser,
    Login,
    getUserList,
    getCaptcha
}