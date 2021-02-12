/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-02-12 14:21:08
 * @LastEditors: 海象
 * @LastEditTime: 2021-02-12 14:22:48
 */

const routes = [
    {
        path: "/userlist",
        name: "UserList",
        component: () => import("@/views/user/userList.vue")
    },
    {
        path: "/userrole",
        name: "UserRole",
        component: () => import("@/views/user/userRole.vue")
    },
]

export default {
    routes
}