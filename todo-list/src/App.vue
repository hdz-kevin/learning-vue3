<script>
import AddTodoForm from './components/AddTodoForm.vue';
import Alert from './components/Alert.vue';
import Navbar from './components/Navbar.vue';

export default {
  components: {
    Alert,
    Navbar,
    AddTodoForm,
  },

  data() {
    return {
      todos: [],
      showAlert: false,
    }
  },

  methods: {
    addTodo(title) {
      if (title.trim() === "") {
        this.showAlert = true;
        return;
      }

      this.todos = [
        ...this.todos,
        {
          title,
          id: Date.now()
        }
      ];
    },

    removeTodo(todoId) {
      this.todos = this.todos.filter(todo => todo.id !== todoId);
    }
  }
};
</script>

<template>
  <Navbar />

  <main class="container">
    <Alert
      message="Todo title is required"
      :show="showAlert"
      @close="showAlert = false"
    />

    <section>
      <AddTodoForm @submit="addTodo" />
    </section>

    <section>
      <div v-for="todo in todos" class="todo" :key="todo.id">
        <p>{{ todo.title }}</p>
        <div>
          <button @click="removeTodo(todo.id)" class="remove-todo-btn">&times;</button>
        </div>
      </div>
    </section>
  </main>
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
