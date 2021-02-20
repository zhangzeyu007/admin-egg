/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-02-12 14:21:08
 * @LastEditors: 海象
 * @LastEditTime: 2021-02-19 10:38:59
 */

const routes = [
    {
        path: "/userlist",
        name: "UserList",
        meta: {
            title: "用户列表 ",
            roles: [1]
        },
        component: () => import("@/views/user/userList.vue")
    },
    {
        path: "/userrole",
        name: "UserRole",
        meta: {
            title: "用户角色",
            roles: [1]
        },
        component: () => import("@/views/user/userRole.vue")
    },
]

export default {
    routes
}