import { createRouter, createWebHistory } from 'vue-router'
import OrdersPage from '../views/OrdersPage.vue'
import ProductsPage from '../views/ProductsPage.vue'

const routes = [
  { path: '/', redirect: '/orders' },
  { path: '/orders', component: OrdersPage },
  { path: '/products', component: ProductsPage }
]

export default createRouter({
  history: createWebHistory(),
  routes
})