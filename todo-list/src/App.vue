<script>
import AddTodoForm from './components/AddTodoForm.vue';
import Alert from './components/Alert.vue';
import Todo from './components/Todo.vue';
import Navbar from './components/Navbar.vue';

export default {
  components: {
    Alert,
    Navbar,
    AddTodoForm,
    Todo,
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
        { title, id: Date.now() }
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
      <Todo
        :todos
        @remove="removeTodo"
      />
    </section>
  </main>
</template>
