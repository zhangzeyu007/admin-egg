/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-03-03 22:08:59
 * @LastEditors: 海象
 * @LastEditTime: 2021-03-09 16:23:26
 */
import axios from '../http'

function addEditor(params) {
    return axios.post('/editor/addeditor', params)
}
function getEditorList(params) {
    return axios.post('/editor/geteditorlist', params)
}
function delEditor(params) {
    return axios.post('/editor/deleditor', params)
}
function editorUpdate(params) {
    return axios.post('/editor/updateeditor', params)
}

export default {
    addEditor,
    getEditorList,
    delEditor,
    editorUpdate
}