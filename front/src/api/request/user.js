/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-01-24 15:52:03
 * @LastEditors: 海象
 * @LastEditTime: 2021-03-23 13:49:14
 */

import axios from '../http'

function Login(params) {
    return axios.post('/user/login', params)
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

function searchUser() {
    return axios.get('/user/searchuser')
}

function getUserInfo(params) {
    return axios.post('/user/userinfo', params)
}

function registerUser(params) {
    return axios.post('/user/registeruser', params)
}

export default {
    getUserInfo,
    searchUser,
    updateUser,
    addUser,
    delUser,
    Login,
    getUserList,
    getCaptcha,
    registerUser
}