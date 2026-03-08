<template>
  <div class="order-card" :class="{ active: active, compact: compact }">
    <!-- название -->
    <div class="order-title">
      {{ order.title }}
    </div>

    <!-- иконка -->
    <div class="order-icon">☰</div>

    <!-- продукты -->
    <div class="order-products">
      <span class="products-count">{{ productsCount }}</span>
      <span class="products-label">Продукта</span>
    </div>

    <!-- дата -->
    <div class="order-date">
      {{ formattedDate }}
    </div>

    <!-- цена -->
    <div class="order-price">
      <div class="price-usd">{{ totalUSD }} $</div>
      <div class="price-uah">{{ totalUAH }} UAH</div>
    </div>

    <!--корзина -->
    <button class="delete-btn" @click.stop="emitDelete" title="Удалить заказ">
      🗑
    </button>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const props = defineProps({
  order: Object,
  active: Boolean,
  compact: Boolean,
});

const emit = defineEmits(["delete"]);

const store = useStore();

const productsCount = computed(
  () => store.getters.productsByOrder(props.order.id).length,
);

const totalUAH = computed(() =>
  store.getters.totalPriceByOrder(props.order.id),
);

const totalUSD = computed(() => Math.round(totalUAH.value / 26));

const formattedDate = computed(() =>
  new Date(props.order.date).toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }),
);

const emitDelete = () => {
  emit("delete", props.order.id);
};
</script>

<style scoped>
.order-card {
  display: grid;
  grid-template-columns: minmax(180px, 1fr) 60px 90px 140px 120px 40px;
  align-items: center;
  padding: 24px 28px;
  background: white;
  border-radius: 10px;
  box-shadow: var(--shadow-light);
  transition: all 0.25s ease;
  cursor: pointer;
  position: relative;
}

.order-card:hover {
  transform: translateY(-2px);
}

.order-card.active {
  background: #f5f7f8;
  box-shadow: -4px 0 10px rgba(0, 0, 0, 0.02);
  z-index: 5;
}

.order-card.active::after {
  content: "❯";
  position: absolute;
  right: -1px;
  top: 0;
  bottom: 0;
  width: 34px;
  background: var(--status-dark);
  display: flex;
  align-items: center;
  justify-content: center;

  color: #f1f4f6;
  font-size: 14px;
  font-weight: bold;
  border-radius: 0 8px 8px 0;
  box-shadow: 4px 0 8px rgba(0, 0, 0, 0.05);
}

.order-title {
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.order-icon {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #f1f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
}

.order-products {
  display: flex;
  flex-direction: column;
  font-size: 12px;
}

.products-count {
  font-weight: 600;
}

.order-date {
  font-size: 13px;
  color: var(--text-secondary);
}

.order-price {
  display: flex;
  flex-direction: column;
  font-size: 13px;
}

.price-usd {
  color: var(--text-secondary);
}

.delete-btn {
  font-size: 18px;
  opacity: 0.6;
}

.delete-btn:hover {
  opacity: 1;
}

.order-card.compact {
  grid-template-columns:
    60px
    90px
    140px;
}

.order-card.compact .order-title {
  display: none;
}

.order-card.compact .order-price {
  display: none;
}

.order-card.compact .delete-btn {
  display: none;
}
</style>
