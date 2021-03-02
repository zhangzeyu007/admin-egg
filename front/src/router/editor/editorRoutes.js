/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-03-02 15:21:26
 * @LastEditors: 海象
 * @LastEditTime: 2021-03-02 15:22:42
 */

const routes = [
    {
        path: "/editorlist",
        name: "EditorList",
        meta: {
            title: "文章列表",
            roles: [1, 2, 3]
        },
        component: () => import("@/views/editor/editorList.vue")
    }
]

export default {
    routes
}