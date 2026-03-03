<template>
  <div>
    <h1>Orders</h1>

    <div v-for="order in orders" :key="order.id">
      <h3>{{ order.title }}</h3>
      <p>Products: {{ getProductsCount(order.id) }}</p>
      <p>Total: {{ getTotal(order.id) }}</p>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'

const store = useStore()
const orders = computed(() => store.state.orders)

const getProductsCount = (id) =>
  store.getters.productsByOrder(id).length

const getTotal = (id) =>
  store.getters.totalPriceByOrder(id)
</script>