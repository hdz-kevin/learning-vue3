<script>
import AddTodoForm from "./components/AddTodoForm.vue";
import Alert from "./components/Alert.vue";
import Todo from "./components/Todo.vue";
import Navbar from "./components/Navbar.vue";
import Modal from "./components/Modal.vue";
import Btn from "./components/Btn.vue";
import axios from "axios";

export default {
  components: {
    AddTodoForm,
    Alert,
    Btn,
    Modal,
    Navbar,
    Todo,
  },

  data() {
    return {
      todos: [],
      alert: {
        show: false,
        message: "",
        variant: "success",
      },
      editTodoForm: {
        show: false,
        todo: { id: null, title: null },
      },
    };
  },

  created() {
    this.fetchTodos();
  },

  methods: {
    async fetchTodos() {
      try {
        const res = await axios.get("http://localhost:3000/todos");
        this.todos = res.data;
      } catch (e) {
        this.showAlert(
          "Failed loading todos, check your internet connection",
          "danger",
        );
      }
    },

    async addTodo(title) {
      if (title.trim() === "") {
        this.showAlert("Title cannot be empty", "danger");
        return;
      }

      try {
        const res = await axios.post("http://localhost:3000/todos", { title });

        // this.fetchTodos();
        // Update UI manually on client side to avoid extra request.
        // Important: do it if the request is successful
        this.todos.push(res.data);
      } catch (e) {
        this.showAlert(
          "Failed to add todo, check your internet connection",
          "danger",
        );
      }
    },

    async removeTodo(id) {
      await axios.delete(`http://localhost:3000/todos/${id}`);

      // Update UI on client side
      this.todos = this.todos.filter((todo) => todo.id !== id);
    },

    showEditTodoForm(todo) {
      this.editTodoForm.show = true;
      this.editTodoForm.todo = { ...todo };
    },

    updateTodo() {
      if (this.editTodoForm.todo.title.trim() === "") {
        this.showAlert = true;
        return;
      }

      const todo = this.todos.find(
        (todo) => todo.id == this.editTodoForm.todo.id,
      );
      todo.title = this.editTodoForm.todo.title;
      this.editTodoForm.show = false;
    },

    showAlert(message, variant = "success") {
      this.alert = { show: true, message, variant };
    },
  },
};
</script>

<template>
  <Navbar />

  <main class="container">
    <Modal :show="editTodoForm.show" @close="editTodoForm.show = false">
      <template #header>
        <h2>Edit Todo</h2>
      </template>

      <template #body>
        <form class="edit-todo-form">
          <label for="title">Todo Title</label>
          <input v-model="editTodoForm.todo.title" type="text" id="title" />
        </form>
      </template>

      <template #footer>
        <div class="edit-todo-modal-footer">
          <Btn @click="updateTodo">Submit</Btn>
          <Btn variant="danger" @click="editTodoForm.show = false">Close</Btn>
        </div>
      </template>
    </Modal>

    <Alert
      :message="alert.message"
      :show="alert.show"
      :variant="alert.variant"
      @close="alert.show = false"
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
        @edit="showEditTodoForm(todo)"
      />
    </section>
  </main>
</template>

<style scoped>
.edit-todo-form > input {
  width: 100%;
  border: 1px solid var(--accent-color);
  padding: 10px 0;
  margin-top: 4px;
}

.edit-todo-modal-footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 15px;
}
</style>
