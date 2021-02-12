/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-01-23 21:57:54
 * @LastEditors: 海象
 * @LastEditTime: 2021-02-12 14:05:32
 */
const routes = [
    {
        path: '/menulist',
        name: 'MenuList',
        meta: {},
        component: resolve => require(['../../views/menu/menuList.vue'], resolve),
    }
]

export default {
    routes
}