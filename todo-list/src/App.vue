<script>
import AddTodoForm from "./components/AddTodoForm.vue";
import Alert from "./components/Alert.vue";
import Todo from "./components/Todo.vue";
import Navbar from "./components/Navbar.vue";
import Modal from "./components/Modal.vue";
import Btn from "./components/Btn.vue";
import axios from "axios";
import Spinner from "./components/Spinner.vue";

export default {
  components: {
    AddTodoForm,
    Alert,
    Btn,
    Modal,
    Navbar,
    Todo,
    Spinner,
  },

  data() {
    return {
      todos: [],
      isLoading: false,
      isPostingTodo: false,
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
      this.isLoading = true;
      try {
        const res = await axios.get("/api/todos");
        this.todos = res.data;
      } catch (e) {
        this.showAlert("Upps! Something went wrong to load todos", "danger");
      }
      this.isLoading = false;
    },

    async addTodo(title) {
      if (title.trim() === "") {
        this.showAlert("Title cannot be empty", "danger");
        return;
      }

      this.isPostingTodo = true;
      try {
        const res = await axios.post("/api/todos", { title });

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
      this.isPostingTodo = false;
    },

    async removeTodo(id) {
      await axios.delete(`/api/todos/${id}`);

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
      <AddTodoForm :is-loading="isPostingTodo" @submit="addTodo" />
    </section>

    <section>
      <Spinner v-if="isLoading" />
      <div v-else>
        <Todo
          v-for="todo in todos"
          :key="todo.id"
          :title="todo.title"
          @remove="removeTodo(todo.id)"
          @edit="showEditTodoForm(todo)"
        />
      </div>
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
