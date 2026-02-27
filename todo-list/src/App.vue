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
      todos: [{ id: Date.now(), title: 'Test', }],
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

    removeTodo(id) {
      this.todos = this.todos.filter(todo => todo.id !== id);
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
        v-for="todo in todos"
        :key="todo.id"
        :title="todo.title"
        @remove="removeTodo(todo.id)"
      />
    </section>
  </main>
</template>
