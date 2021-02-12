/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-02-12 13:24:08
 * @LastEditors: 海象
 * @LastEditTime: 2021-02-12 14:01:24
 */

const routes = [
    {
        path: "/goodslist",
        name: "GoodsList",
        component: () => import("@/views/goods/goodsList.vue")
    },
    {
        path: "/goodsdetail",
        name: "GoodsDetail",
        component: () => import("@/views/goods/goodsDetail.vue")
    },
]

export default {
    routes
}