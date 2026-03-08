<template>
  <div class="orders-page">
    <div class="orders-container">
      <header class="page-header">
        <div class="title-row">
          <button class="add-btn"><span>+</span></button>
          <h1 class="page-title">Приходы / {{ orders.length }}</h1>
        </div>
      </header>
      <div
        class="orders-layout"
        :class="{ 'orders-layout-active': selectedOrder }"
      >
        <div class="orders-list">
          <!--список заказов-->
          <TransitionGroup name="list">
            <OrderCard
              v-for="order in orders"
              :key="order.id"
              :order="order"
              :active="selectedOrder === order.id"
              :compact="selectedOrder !== null"
              @click="selectOrder(order.id)"
              @delete="requestDelete"
            />
          </TransitionGroup>
        </div>

        <!--блок  вывода выбранного заказа-->
        <Transition name="list">
          <OrderDetails
            v-if="selectedOrder"
            :orderId="selectedOrder"
            @close="closeDetails"
          />
        </Transition>
      </div>

      <div v-if="orders.length === 0" class="empty-state card center">
        <p class="text-muted">Тут пусто. Закажи что нибудь.</p>
      </div>
    </div>

    <!-- Модальное с телепортом -->
    <Teleport to="body">
      <Transition name="fade">
        <ConfirmModal
          v-if="isModalOpen"
          @confirm="confirmDelete"
          @cancel="cancelDelete"
        >
          <template #details>
            <div class="delete-info">
              <span class="status-dot"></span>
              <div class="delete-product">
                <img
                  :src="`https://picsum.photos/seed/${orderToDelete}/40/40`"
                  alt="product"
                  class="mini-img"
                />
                <span class="delete-title"> {{ orderTitle }} </span>
              </div>
            </div>
          </template>
        </ConfirmModal>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { computed, ref } from "vue";
import OrderCard from "@/components/OrderCard.vue";
import OrderDetails from "@/components/OrderDetails.vue";
import ConfirmModal from "@/components/ConfirmModal.vue";

const store = useStore();

// получаем список заказов из store
const orders = computed(() => store.state.orders);

const isModalOpen = ref(false);

// здесь временно храним id заказа, который пользователь собирается удалить
const orderToDelete = ref(null);

// открываем модальное при нажатии корзины сохраняем id заказа и открываем модалку
const requestDelete = (id) => {
  orderToDelete.value = id;
  isModalOpen.value = true;
};

// для отображения названия удаляемого заказа в модалке
const orderTitle = computed(() => {
  const order = orders.value.find((o) => o.id === orderToDelete.value);
  return order ? order.title : "";
});

// подтверждение удаления
const confirmDelete = () => {
  // удаляем заказ через mutation removeOrder (логика в store/index.js)
  store.commit("removeOrder", orderToDelete.value);

  // закрываем модальное окно
  isModalOpen.value = false;

  // очищаем id удаляемого заказа
  orderToDelete.value = null;
};

// пользователь отменил удаление
const cancelDelete = () => {
  // закрываем модалку и очищаем временный id
  isModalOpen.value = false;
  orderToDelete.value = null;
};

// id заказа, который сейчас выбран и открыт в деталях
const selectedOrder = ref(null);

// выбираем заказ и показываем его детали
const selectOrder = (id) => {
  selectedOrder.value = id;
};

// закрываем блок с деталями заказа
const closeDetails = () => {
  selectedOrder.value = null;
};
</script>

<style scoped>
.orders-page {
  display: flex;
  justify-content: center;
}

.orders-container {
  width: 100%;
  max-width: 1100px;
}

.page-header {
  margin-bottom: 40px;
}

.page-title {
  font-size: 28px;
  font-weight: 700;
}

.orders-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.delete-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.delete-info {
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 5vw;
}

.delete-product {
  display: flex;
  align-items: center;
  gap: 12px;
}

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
}

.mini-img {
  width: 40px;
  height: 40px;
  border-radius: 6px;
  object-fit: cover;
}

.delete-title {
  font-size: 14px;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.4s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-move {
  transition: transform 0.4s ease;
}
.orders-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  transition: grid-template-columns 0.35s ease;
}

.orders-layout-active {
  grid-template-columns: 380px 1fr;
}

.empty-state {
  padding: 60px;
  background: var(--bg-white);
  border-radius: 12px;
  box-shadow: var(--shadow-light);
  margin-top: 20px;
}

.title-row {
  display: flex;
  align-items: center;
  gap: 16px;
}

.add-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--accent);
  color: white;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.add-btn span {
  position: relative;
  top: -2px;
}
</style>
