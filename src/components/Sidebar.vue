<template>
  <aside class="sidebar">
    <!-- профиль -->
    <div class="user-profile">
      <div class="avatar-wrapper">
        <img src="@/assets/images/avatar.png" alt="User" class="avatar-img" />
        <button class="settings-btn" aria-label="Настройки" title="Настройки">
          ⚙️
        </button>
      </div>
    </div>
    <!-- навигация -->
    <nav class="nav">
      <router-link to="/orders" class="nav-item"> Приход </router-link>
      <router-link to="/groups" class="nav-item"> Группы </router-link>
      <router-link to="/products" class="nav-item"> Продукты </router-link>
      <router-link to="/users" class="nav-item"> Пользователи </router-link>
      <router-link to="/settings" class="nav-item"> Настройки </router-link>
    </nav>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 260px;
  height: 100%;
  background: var(--bg-white);
  padding: 60px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: 1px solid var(--border);
}

.user-profile {
  margin-bottom: 50px;
}
.avatar-wrapper {
  position: relative;
  width: 95px;
  height: 95px;
}
.avatar-img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #f8f9fa;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}
.settings-btn {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 32px;
  height: 32px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* навигация */
.nav {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 12px;
}
.nav-item {
  display: inline-flex;
  align-items: center;
  padding: 12px 4px;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--text-secondary);
  text-decoration: none;
  border-bottom: 3px solid transparent;
  transition: all 0.2s ease;
}

.nav-item.router-link-active {
  color: var(--text-primary);
  border-bottom-color: var(--accent);
}
</style>
