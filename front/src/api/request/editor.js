/*
 * @Description:
 * @Author: 张泽雨
 * @Date: 2021-03-08 16:45:30
 * @LastEditors: 张泽雨
 * @LastEditTime: 2024-03-26 14:29:26
 * @FilePath: \admin-egg\front\src\api\request\editor.js
 */
import axios from "../http";

function addEditor(params) {
  return axios.post("/editor/addeditor", params);
}
function getEditorList(params) {
  return axios.post("/editor/geteditorlist", params);
}
function delEditor(params) {
  return axios.post("/editor/deleditor", params);
}
function editorUpdate(params) {
  return axios.post("/editor/updateeditor", params);
}
function editorSearch(params) {
  return axios.post("/editor/searcheditor", params);
}

export default {
  addEditor,
  getEditorList,
  delEditor,
  editorUpdate,
  editorSearch,
};
