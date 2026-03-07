<template>
  <div class="orders-page">
    <div class="orders-container">
      <header class="page-header">
        <h1 class="page-title">Приходы / {{ orders.length }}</h1>
      </header>
      <div class="orders-layout">
        <div class="orders-list">
          
       <!--список заказов-->    
          <TransitionGroup name="list">
            <OrderCard
              v-for="order in orders"
              :key="order.id"
              :order="order"
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
        />
      </Transition>
    </Teleport>

  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { computed, ref } from 'vue'
import OrderCard from '@/components/OrderCard.vue'
import OrderDetails from '@/components/OrderDetails.vue'
import ConfirmModal from '@/components/ConfirmModal.vue'

const store = useStore()

// получаем список заказов из store 
const orders = computed(() => store.state.orders)

// реактивная переменная для управления модальным
const isModalOpen = ref(false)

// здесь временно храним id заказа, который пользователь собирается удалить
const orderToDelete = ref(null)

// открываем модальное при нажатии корзины сохраняем id заказа и открываем модалку 
const requestDelete = (id) => {
  orderToDelete.value = id
  isModalOpen.value = true
}

// подтверждение удаления
const confirmDelete = () => {
  // удаляем заказ через mutation removeOrder (логика в store/index.js)
  store.commit('removeOrder', orderToDelete.value)

  // закрываем модальное окно
  isModalOpen.value = false

  // очищаем id удаляемого заказа
  orderToDelete.value = null
}

// пользователь отменил удаление
const cancelDelete = () => {
  // закрываем модалку и очищаем временный id
  isModalOpen.value = false
  orderToDelete.value = null
}

// id заказа, который сейчас выбран и открыт в деталях
const selectedOrder = ref(null)

// выбираем заказ и показываем его детали
const selectOrder = (id) => {
  selectedOrder.value = id
}

// закрываем блок с деталями заказа
const closeDetails = () => {
  selectedOrder.value = null
}
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

.empty-state {
  padding: 60px;
  text-align: center;
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
  grid-template-columns: 380px 1fr;
  gap: 20px;
}

</style>