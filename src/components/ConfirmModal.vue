<template>
  <div class="overlay" @click.self="emitCancel">
    <div class="modal">
      <button class="close-modal" @click="emitCancel">✕</button>
      <div class="modal-header">
        <h3>Вы уверены, что хотите удалить этот приход?</h3>
      </div>
      <div class="modal-body">
        <slot name="details"></slot>
      </div>
      <div class="modal-footer">
        <button class="btn-cancel" @click="emitCancel">Отменить</button>
        <button class="btn-delete" @click="emitConfirm">🗑 Удалить</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(["confirm", "cancel"]);
const emitConfirm = () => emit("confirm");
const emitCancel = () => emit("cancel");
</script>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(44, 62, 80, 0.4);
  backdrop-filter: blur(2px);
  z-index: 10000;
}

.modal {
  width: 520px;
  background: white;
  border-radius: 6px;
  position: relative;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.modal-header {
  padding: 30px 40px;
  text-align: center;
}

.modal-header h3 {
  font-size: 18px;
  font-weight: 700;
  color: var(--text-primary);
}

.modal-body {
  display: flex;
  align-items: center;
  justify-content: start;
  padding: 22px 0;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  padding-left: 3vw;
}

.modal-footer {
  background: #7fb54a;
  padding: 20px 40px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 20px;
}

.btn-cancel {
  color: white;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.btn-delete {
  background: white;
  color: #eb5757;
  border-radius: 20px;
  padding: 10px 24px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
}

.close-modal {
  position: absolute;
  top: -15px;
  right: -15px;
  cursor: pointer;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
