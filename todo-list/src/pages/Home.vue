<script setup>
import AddTodoForm from "@/components/AddTodoForm.vue";
import Alert from "@/components/Alert.vue";
import Todo from "@/components/Todo.vue";
import axios from "axios";
import Spinner from "@/components/Spinner.vue";
import { reactive, ref } from "vue";
import { useFetch } from "@/composables/fetch";

const isPostingTodo = ref(false);
const alert = reactive({
  show: false,
  message: "",
  variant: "success",
});

// Fetch todos from API
const { data: todos, isLoading } = useFetch("/api/todos", {
  onError: () => showAlert("Upps! Failed to load todos", "danger"),
});

function showAlert(message, variant = "success") {
  alert.show = true;
  alert.message = message;
  alert.variant = variant;
}

async function addTodo(title) {
  if (title.trim() === "") {
    showAlert("Title cannot be empty", "danger");
    return;
  }

  isPostingTodo.value = true;
  try {
    const res = await axios.post("/api/todos", { title });

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

</script>

<template>
    <Alert
      :show="alert.show"
      :message="alert.message"
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
          @edit="$router.push(`/todos/${todo.id}/edit`)"
        />
      </div>
    </section>
</template>
