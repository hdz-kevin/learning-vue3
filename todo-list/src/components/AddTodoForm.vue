<script>
import Btn from './Btn.vue';

  export default {
    components: { Btn },
    
    data() {
      return {
        todoTitle: "",
      }
    },

    emits: ['submit'],
  }
</script>

<template>
  <form class="add-todo-form">
    <input v-model="todoTitle" type="text" placeholder="Todo Title" />
    <div>
      <Btn
        class="btn"
        @click="$emit('submit', todoTitle)"
      >
        Add Todo
      </Btn>
    </div>
  </form>
</template>

<style scoped>
.add-todo-form {
  display: flex;
  justify-content: space-between;
  gap: 1.5rem;
  margin-bottom: 40px;
}

.add-todo-form input {
  flex: 1;
  border: solid 2px var(--accent-color);
  border-radius: 10px;
  padding: 15px 10px;
  font-size: 18px;
}

.btn {
  height: 100%;
  padding: 0 15px;
}
</style>
