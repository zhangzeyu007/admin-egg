/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-02-12 13:24:08
 * @LastEditors: 海象
 * @LastEditTime: 2021-02-19 10:38:49
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
    },
    {
        path: "/goodsdetail",
        name: "GoodsDetail",
        meta: {
            title: "商品详情",
            roles: [1, 2, 3]
        },
        component: () => import("@/views/goods/goodsDetail.vue")
    },
]

export default {
    routes
}