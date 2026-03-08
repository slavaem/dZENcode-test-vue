<template>
  <div class="product-card">
    <!-- статус -->
    <span class="status-dot"></span>
    <!-- изображение -->
    <img
      :src="`https://picsum.photos/seed/${product.id}/40/40`"
      alt="product"
      class="product-img"
    />
    <!-- название -->
    <div class="product-main">
      <div class="product-title">
        {{ product.title }}
      </div>

      <div class="product-serial">SN-{{ product.serialNumber }}</div>
    </div>
    <!-- состояние -->
    <div class="product-status">
      {{ product.isNew ? "новый" : "б/у" }}
    </div>
    <!-- гарантия -->
    <div class="product-guarantee">
      <span>{{ startDate }}</span>
      <span>{{ startDateLocal }}</span>
    </div>
    <!-- цена -->
    <div class="product-price">
      <div v-for="price in product.price" :key="price.symbol">
        {{ price.value }} {{ price.symbol }}
      </div>
    </div>
    <!--название заказа -->
    <div class="product-order">
      {{ orderTitle }}
    </div>
    <!-- дата -->
    <div class="product-date">
      {{ createdDate }}
    </div>
    <!-- корзина -->
    <button class="delete-btn">🗑</button>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const store = useStore();

/* название заказа */
const orderTitle = computed(() => {
  const order = store.state.orders.find((o) => o.id === props.product.order);
  return order ? order.title : "-";
});

/* дата гарантии */
const startDate = computed(() => {
  return new Date(props.product.guarantee.start).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
});

const startDateLocal = computed(() => {
  return new Date(props.product.guarantee.start).toLocaleDateString("ru-RU");
});

/* дата создания */
const createdDate = computed(() => {
  return new Date(props.product.date).toLocaleDateString("ru-RU");
});
</script>

<style scoped>
.product-card {
  display: grid;
  grid-template-columns: 15px 50px 5fr 90px 5vw 120px 5vw 120px 40px;
  align-items: center;
  gap: 5px;
  padding: 18px 20px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--bg-white);
  width: 100%;
}

product-card:hover {
  background: #f7f9fa;
}

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #8bc34a;
}

.product-img {
  width: 36px;
  height: 36px;
  border-radius: 4px;
  object-fit: cover;
}

.product-main {
  display: flex;
  flex-direction: column;
}

.product-title {
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.product-serial {
  font-size: 12px;
  color: var(--text-secondary);
}

.product-status {
  font-size: 13px;
}

.product-guarantee {
  display: flex;
  flex-direction: column;
  font-size: 12px;
}

.product-price {
  display: flex;
  flex-direction: column;
  font-size: 13px;
}

.product-order {
  font-size: 13px;
}

.product-date {
  font-size: 13px;
}

.delete-btn {
  font-size: 16px;
  opacity: 0.6;
}

.delete-btn:hover {
  opacity: 1;
}
</style>
