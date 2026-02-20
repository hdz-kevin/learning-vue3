<template>
  <nav class="navbar">
    <img src="@/assets/logo.svg" width="45" />
    <div class="brand">Todo List App</div>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  gap: 10px;
  background: var(--navbar-color);
  padding: 20px;
  margin-bottom: 50px;
}

.brand {
  font-size: 2rem;
}
</style>
