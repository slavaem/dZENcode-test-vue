<template>
  <header class="top-menu">

    <div class="logo">
      <img src="@/assets/images/logo.png" alt="Logo" class="logo-img" />
      <span class="logo-text">INVENTORY</span>
    </div>

    <div class="search-bar">
      <input
        type="text"
        placeholder="Поиск"
        class="search-input"
      />
    </div>

    <div class="info-block">
      <div class="datetime">
        <span class="day-label">Today</span>

        <div class="date-row">
          <span class="calendar-date">
            {{ calendarDate }}
          </span>

          <span class="time-now">
            <span class="clock-icon">🕒</span>
            {{ formattedTime }}
          </span>
        </div>
      </div>

      <div class="sessions">
        <span class="sessions-label">Sessions:</span>

        <span class="sessions-count">
          🟢 {{ sessions }}
        </span>
      </div>

    </div>

  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { io } from 'socket.io-client'

const now = ref(new Date())
const sessions = ref(0)
let interval = null
let socket = null

onMounted(() => {
  // обновление текущей даты и времени
  interval = setInterval(() => {
    now.value = new Date()
  }, 1000)

  // подключение websocket
  socket = io('http://localhost:3001')

  // слушаем событие "clients" от сервера (server.js)
  socket.on('clients', (count) => {
    sessions.value = count
  })
})

onUnmounted(() => {
  // при размонтировании компонента
  // очищаем таймер 
  clearInterval(interval)

  // закрываем соединение
  if (socket) {
    socket.disconnect()
  }
})

const calendarDate = computed(() => {
  const options = { day: '2-digit', month: 'short', year: 'numeric' };
  return now.value.toLocaleDateString('en-GB', options).toUpperCase().replace('.', '');
})

const formattedTime = computed(() =>
  now.value.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
)
</script>

<style scoped>
.top-menu{
  display:flex;
  justify-content:space-between;
  align-items:center;
  height:70px;
  padding:0 40px;
  background:var(--bg-white);
  box-shadow:0 2px 10px rgba(0,0,0,0.05);
}
/* логотип */
.logo{
  display:flex;
  align-items:center;
  gap:10px;
  font-weight:800;
  color:#6fcf97;
  letter-spacing:1px;
}
.logo-img{
  height:45px;
}
.logo-text{
  font-size:18px;
}
/* поиск */
.search-bar {
  flex: 1;
  display: flex;
  justify-content: center;
}
.search-input{
  width:300px;
  padding:8px 16px;
  background:#f0f3f5;
  border:1px solid transparent;
  border-radius:4px;
  outline:none;
  font-size:14px;
}
/* информационный блок */
.info-block{
  display:flex;
  align-items:center;
  gap:40px;
}
/* дата */
.datetime{
  display:flex;
  flex-direction:column;
  line-height:1.2;
}
.day-label{
  font-size:14px;
  font-weight:500;
}
.date-row{
  display:flex;
  align-items:center;
  gap:12px;
  font-size:12px;
  color:var(--text-secondary);
}
.calendar-date{
  font-weight:600;
}
.time-now{
  display:flex;
  align-items:center;
  gap:4px;
  color:var(--text-primary);
  font-weight:600;
}
/* активные сессии */
.sessions{
  display:flex;
  align-items:center;
  gap:8px;
  font-size:14px;
}
.sessions-count{
  font-weight:700;
  color:var(--accent);
}

</style>