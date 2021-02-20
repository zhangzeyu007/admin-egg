/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-01-23 21:57:54
 * @LastEditors: 海象
 * @LastEditTime: 2021-02-19 10:38:18
 */
const routes = [
    {
        path: '/menulist',
        name: 'MenuList',
        meta: {
            title: "菜单列表",
            roles: [1, 2, 3]
        },
        component: resolve => require(['../../views/menu/menuList.vue'], resolve),
    }
]

export default {
    routes
}