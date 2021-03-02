/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-02-12 13:24:08
 * @LastEditors: 海象
 * @LastEditTime: 2021-03-02 15:20:31
 */

const routes = [
    {
        path: "/goodslist",
        name: "GoodsList",
        meta: {
            title: "商品列表",
            roles: [1, 2, 3]
        },
        component: () => import("@/views/goods/goodsList.vue")
    }
]

export default {
    routes
}