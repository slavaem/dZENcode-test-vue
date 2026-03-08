<template>
  <div class="order-details" id="order-details">
    <header class="details-header">
      <h2 class="details-title">{{ orderTitle }}</h2>

      <button
        class="close-btn"
        @click="$emit('close')"
        aria-label="Close details"
        title="Закрыть"
      >
        ✕
      </button>
    </header>

    <div class="products-list">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />

      <p v-if="!products.length" class="empty">Нет продуктов</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import ProductCard from "@/components/ProductCard.vue";

const props = defineProps({
  orderId: {
    type: Number,
    required: true,
  },
});

const store = useStore();

// название заказа
const order = computed(() =>
  store.state.orders.find((o) => o.id === props.orderId),
);

const orderTitle = computed(() => (order.value ? order.value.title : "Order"));

// продукты заказа
const products = computed(() =>
  store.state.products.filter((p) => p.order === props.orderId),
);
</script>

<style scoped>
.order-details {
  background: var(--bg-white);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 20px;
  max-width: 84%;
}

.details-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 20px;
}

.details-title {
  font-size: 18px;
  font-weight: 600;
}

.close-btn {
  cursor: pointer;
  position: relative;
  top: -40px;
  right: -35px;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.products-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.empty {
  color: var(--text-secondary);
}
</style>
