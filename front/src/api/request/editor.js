/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-03-03 22:08:59
 * @LastEditors: 海象
 * @LastEditTime: 2021-03-03 22:10:48
 */
import axios from '../http'

function addEditor(params) {
    return axios.post('/editor/addeditor', params)
}

export default {
    addEditor
}