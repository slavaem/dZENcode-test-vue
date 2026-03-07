<template>
  <div class="order-card">
    <div class="order-info">
      <h3>{{ order.title }}</h3>
      <p class="text-muted">
        Products: {{ productsCount }}
      </p>
      <p>
        Total: {{ total }}
      </p>
    </div>
<button
  class="delete-btn"
  @click="emitDelete"
  title="Удалить заказ"
  aria-label="Удалить заказ"
>
<span class="icon-trash">🗑</span>
</button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

// данные заказа, из родительского компонента через пропс
const props = defineProps({
  order: {
    type: Object,
    required: true
  }
})

// событие удаления заказа
const emit = defineEmits(['delete'])

const store = useStore()

// количество товаров в заказе
const productsCount = computed(() =>
  store.getters.productsByOrder(props.order.id).length
)

// общая стоимость заказа
const total = computed(() =>
  store.getters.totalPriceByOrder(props.order.id)
)

// отправляем родителю событие удаления
const emitDelete = () => {
  emit('delete', props.order.id)
}
</script>

<style scoped>
.order-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 28px 32px;
  border-radius: 12px;
  background: var(--bg-white);
  box-shadow: var(--shadow-light);
  width: 100%;
  transition: all 0.2s ease;
}

.order-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
}

.order-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.order-info h3 {
  font-size: 20px;
  font-weight: 600;
}

.delete-btn {
  color: var(--danger);
  font-size: 20px;
  opacity: 0.6;
  transition: opacity 0.2s ease;
}

.delete-btn:hover {
  opacity: 1;
}

</style>