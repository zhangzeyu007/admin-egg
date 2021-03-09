/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-03-03 22:08:59
 * @LastEditors: 海象
 * @LastEditTime: 2021-03-08 17:46:32
 */
import axios from '../http'

function addEditor(params) {
    return axios.post('/editor/addeditor', params)
}
function getEditorList(params) {
    return axios.post('/editor/geteditorlist', params)
}

export default {
    addEditor,
    getEditorList
}