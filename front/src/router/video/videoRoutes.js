/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-03-21 20:49:25
 * @LastEditors: 海象
 * @LastEditTime: 2021-03-21 20:53:51
 */

/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-02-12 14:21:08
 * @LastEditors: 海象
 * @LastEditTime: 2021-02-19 10:38:59
 */

const routes = [
    {
        path: "/aiqiyi",
        name: "Aiqiyi",
        meta: {
            title: "爱奇艺",
            roles: [1, 2, 3]
        },
        component: () => import("@/views/video/Aiqiyi.vue"),
        children: []
    },
]

export default {
    routes
}