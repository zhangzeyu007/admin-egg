/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-02-21 12:37:49
 * @LastEditors: 海象
 * @LastEditTime: 2021-02-28 21:06:25
 */

import axios from '../http'

function addGoods(params) {
    return axios.post('/goods/addgoods', params)
}
function getGoodsList(params) {
    return axios.post('/goods/getgoodslist', params)
}


export default {
    addGoods,
    getGoodsList
}