<template>
  <div class="overlay" @click.self="emitCancel">
    <div class="modal">
      <h3>Удалить заказ?</h3>
      <div class="actions">
        <button class="cancel" @click="emitCancel">Отмена</button>
        <button class="confirm" @click="emitConfirm">Удалить</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['confirm', 'cancel'])

const emitConfirm = () => emit('confirm')
const emitCancel = () => emit('cancel')
</script>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  background: white;
  padding: 30px;
  border-radius: 8px;
  min-width: 300px;
}

.actions {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.confirm {
  background: var(--danger);
  color: white;
  padding: 8px 14px;
  border-radius: 6px;
}

.cancel {
  padding: 8px 14px;
}
</style>