<script setup>
import AddTodoForm from "./components/AddTodoForm.vue";
import Alert from "./components/Alert.vue";
import Todo from "./components/Todo.vue";
import Navbar from "./components/Navbar.vue";
import axios from "axios";
import Spinner from "./components/Spinner.vue";
import EditTodoForm from "./components/EditTodoForm.vue";
import { reactive, ref } from "vue";

const todos = ref([]);
const isLoading = ref(false);
const isPostingTodo = ref(false);
const alert = reactive({
  show: false,
  message: "",
  variant: "success",
});
const editTodoForm = reactive({
  show: false,
  todo: { id: null, title: null },
});

// Fetch todos from API
fetchTodos();

function showAlert(message, variant = "success") {
  alert.show = true;
  alert.message = message;
  alert.variant = variant;
}

function showEditTodoForm(todo) {
  editTodoForm.show = true;
  editTodoForm.todo = { ...todo };
}

async function fetchTodos() {
  isLoading.value = true;
  try {
    const res = await axios.get("/api/todos");
    todos.value = res.data;
  } catch (e) {
    showAlert("Upps! Something went wrong to load todos", "danger");
  }
  isLoading.value = false;
}

async function addTodo(title) {
  if (title.trim() === "") {
    showAlert("Title cannot be empty", "danger");
    return;
  }

  isPostingTodo.value = true;
  try {
    const res = await axios.post("/api/todos", { title });

    // this.fetchTodos();
    // Update UI manually on client side to avoid extra request.
    // Important: do it if the request is successful
    todos.value.push(res.data);
  } catch (e) {
    showAlert("Failed to add todo, check your internet connection", "danger");
  }
  isPostingTodo.value = false;
}

async function removeTodo(id) {
  await axios.delete(`/api/todos/${id}`);

  // Update UI on client side
  todos.value = todos.value.filter((todo) => todo.id !== id);
}

async function updateTodo() {
  const { id, title } = editTodoForm.todo;

  if (title.trim() === "") {
    showAlert("Title cannot be empty", "danger");
    return;
  }

  try {
    await axios.put(`/api/todos/${id}`, { title });
    // Update on client side
    todos.value.find((todo) => todo.id == id).title = title;
  } catch (e) {
    showAlert("Failed to editing todo", "danger");
  }

  editTodoForm.show = false;
}
</script>

<template>
  <Navbar />

  <main class="container">
    <EditTodoForm
      :show="editTodoForm.show"
      v-model="editTodoForm.todo.title"
      @close="editTodoForm.show = false"
      @submit="updateTodo"
    />

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
