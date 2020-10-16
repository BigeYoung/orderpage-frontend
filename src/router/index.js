import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/order',
    name: '下订单',
    component: () => import('../views/Pages/Order.vue'),
    meta: { icon: "mdi-cart-outline" }
  },
  {
    path: '/process',
    name: '加工中',
    component: () => import('../views/Pages/Process.vue'),
    meta: { icon: "mdi-cog-outline" }
  },
  {
    path: '/done',
    name: '已完成',
    component: () => import('../views/Pages/Done.vue'),
    meta: { icon: "mdi-check-circle-outline" }
  },
  {
    path: '*',
    redirect: "/order"
  }
]

const router = new VueRouter({
  routes
})

export default router
