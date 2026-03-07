<template>
  <div class="products-page">

    <header class="page-header">
      <h1 class="page-title">Продукты / {{ filteredProducts.length }}</h1><!-- выводим количество выбранных продутов-->

      <select v-model="selectedType" class="filter"> <!-- селектируем по типу продукта--> 
        <option value="">Все</option>
        <option
          v-for="type in productTypes"
          :key="type"
          :value="type"
        >
          {{ type }}
        </option>
      </select>

    </header>

    <div class="products-list">
      <ProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
      /> <!-- выводим список продуктов с учетом селекции по типу -->
    </div>

  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import ProductCard from '@/components/ProductCard.vue'

const store = useStore() 

const products = computed(() => store.state.products) // получаем данные продуктов из стора

const selectedType = ref('') 

const productTypes = computed(() => {
  const types = products.value.map(p => p.type)
  return [...new Set(types)]
}) // получаем список типов продуктов

const filteredProducts = computed(() => {
  if (!selectedType.value) return products.value

  return products.value.filter(
    product => product.type === selectedType.value
  )
}) // фильтруем продукты по выбранному типу
</script>

<style scoped>

.products-page {
  max-width: 900px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
}

.page-title {
  font-size: 28px;
  font-weight: 700;
}

.filter {
  padding: 8px 12px;
}

.products-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

</style>