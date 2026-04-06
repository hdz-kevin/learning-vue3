<template>
<div class="nav-bg">
  <nav class="navbar container-xl">
    <div class="logo">
      <img src="@/assets/logo.svg" width="45" />
      <div class="brand">Todo List App</div>
    </div>

    <div class="links">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/todos/create">Add Todo</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </div>
  </nav>
</div>
</template>

<style scoped>
.nav-bg {
  background: var(--navbar-color);
  padding: 20px;
  margin-bottom: 50px;
}

.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
}

.links {
  display: flex;
  gap: 15px;
}

.links a {
  text-decoration: none;
  color: var(--text-color);
  font-size: 1.2rem;
}

a.router-link-active {
  color: var(--accent-color);
}

.brand {
  font-size: 2rem;
}
</style>
