<template>
  <div class="layout">
    <TopMenu />
    
    <div class="content-wrapper">
      <Sidebar />
      
      <main class="main-content">
        <div class="slot-container">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import Sidebar from './Sidebar.vue'
import TopMenu from './TopMenu.vue'
</script>

<style scoped>
  .layout {
  display: flex;
  flex-direction: column;
  height: 100dvh;
  width: 100%;

}

.main-content {
  flex: 1;
  background: var(--bg-main);
  padding: 40px 60px;
  overflow-y: auto;
}
.content-wrapper {
  flex: 1;
  display: flex;
  min-width: 0;
}
.slot-container {
  max-width: 1600px;
  margin: 0 auto;
}

</style>