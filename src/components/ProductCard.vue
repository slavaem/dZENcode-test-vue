<template>
  <div class="product-card">

    <div class="product-left">

      <h3 class="product-title">
        {{ product.title }}
      </h3>

      <p class="product-type">
        {{ product.type }}
      </p>

      <div class="product-guarantee">
        <span>
          {{ startDate }}
        </span>

        <span>
          {{ startDateLocal }}
        </span>
      </div>

    </div>

    <div class="product-center">

      <div
        v-for="price in product.price"
        :key="price.symbol"
        class="product-price"
      >
        {{ price.value }} {{ price.symbol }}
      </div>

    </div>

    <div class="product-right">

      <span class="order-title">
        {{ orderTitle }}
      </span>

    </div>

  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

// товар, переданный из родительского списка продуктов
const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const store = useStore()

// находим название заказа, к которому относится товар
const orderTitle = computed(() => {
  const order = store.state.orders.find(
    o => o.id === props.product.order
  )
  return order ? order.title : '—'
})

// дата начала гарантии (английский формат)
const startDate = computed(() => {
  return new Date(
    props.product.guarantee.start
  ).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
})

// дата начала гарантии (локальный формат)
const startDateLocal = computed(() => {
  return new Date(
    props.product.guarantee.start
  ).toLocaleDateString('ru-RU')
})
</script>



<style scoped>

.product-card {
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 20px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--bg-white);
}


.product-left {
  display: flex;
  flex-direction: column;
  gap: 6px;
}


.product-title {
  font-weight: 600;
}


.product-type {
  color: var(--text-secondary);
}


.product-guarantee {
  display: flex;
  gap: 10px;
}


.product-center {
  display: flex;
  flex-direction: column;
}


.product-right {
  font-weight: 500;
}

</style>