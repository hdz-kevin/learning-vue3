<script>
  export default {
    props: {
      todos: {
        required: true,
        type: Array,
      }
    },

    emits: ['remove']
  }
</script>

<template>
  <div v-for="todo in todos" class="todo" :key="todo.id">
    <p>{{ todo.title }}</p>
    <div>
      <button @click="$emit('remove', todo.id)" class="remove-todo-btn">&times;</button>
    </div>
  </div>
</template>

<style scoped>
.todo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--accent-color);
  margin-top: 20px;
  padding: 0 20px 0 20px;
  border-radius: 10px;
}

.todo p {
  font-size: 18px;
}

.remove-todo-btn {
  height: 35px;
  width: 35px;
  border-radius: 50%;
  border: none;
  font-size: 18px;
  color: var(--text-color);
  background: var(--danger-color);
}
</style>
