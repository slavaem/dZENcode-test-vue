import { createStore } from 'vuex'
import { orders, products } from '../data/mockData'

export default createStore({
  state: {
    orders,
    products
  },

  getters: {
    productsByOrder: (state) => (orderId) => {
      return state.products.filter(p => p.order === orderId)
    },

    totalPriceByOrder: (state) => (orderId) => {
      const products = state.products.filter(p => p.order === orderId)

      return products.reduce((sum, product) => {
        const defaultPrice = product.price.find(price => price.isDefault)
        return sum + (defaultPrice ? defaultPrice.value : 0)
      }, 0)
    }
  },

  mutations: {
  setOrders(state, orders) {
    state.orders = orders
  },
  setProducts(state, products) {
    state.products = products
  },
  removeOrder(state, orderId) {
    state.orders = state.orders.filter(o => o.id !== orderId)
    state.products = state.products.filter(p => p.order !== orderId)
  }
}
})