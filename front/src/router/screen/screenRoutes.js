/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-03-17 10:13:49
 * @LastEditors: 海象
 * @LastEditTime: 2021-03-17 10:15:23
 */
const routes = [
    {
        path: '/visualscreen',
        name: 'visualScreen',
        meta: {
            title: "可视化大屏",
            roles: [1, 2, 3]
        },
        component: resolve => require(['../../views/screen/visualScreen.vue'], resolve),
    }
]

export default {
    routes
}