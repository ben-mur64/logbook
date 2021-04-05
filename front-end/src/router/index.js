import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Add from '../views/Add.vue'
import MyPurchases from '../views/MyPurchases.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/add',
    name: 'Add',
    component: Add
  },
  {
    path: '/mypurchases',
    name: 'MyPurchases',
    component: MyPurchases
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
