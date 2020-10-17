import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/main',
    name: 'MainPage',
    component: () => import('../views/MainPage/Main.vue'),
    children: [
      {
        path: 'order',
        name: '下订单',
        component: () => import('../views/MainPage/Order.vue'),
        meta: { icon: "mdi-cart-outline" }
      },
      {
        path: 'process',
        name: '加工中',
        component: () => import('../views/MainPage/Process.vue'),
        meta: { icon: "mdi-cog-outline" }
      },
      {
        path: 'done',
        name: '已完成',
        component: () => import('../views/MainPage/Done.vue'),
        meta: { icon: "mdi-check-circle-outline" }
      },
      {
        path: '*',
        redirect: "order"
      }
    ]
  },
  {
    path: '/product/:product_guid',
    name: '产品详情',
    component: () => import('../views/Product.vue')
  },
  {
    path: '*',
    redirect: "/main/order"
  }
]

const router = new VueRouter({
  routes
})

export default router
