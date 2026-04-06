<script setup>
import Alert from "@/components/Alert.vue";
import Todo from "@/components/Todo.vue";
import axios from "axios";
import Spinner from "@/components/Spinner.vue";
import { useFetch } from "@/composables/fetch";
import { useAlert } from "@/composables/useAlert";

const { alert, showAlert } = useAlert();

// Fetch todos from API
const { data: todos, isLoading } = useFetch("/api/todos", {
  onError: () => showAlert("Upps! Failed to load todos", "danger"),
});

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
      <Spinner v-if="isLoading" />
      <div v-else>
        <Todo
          v-for="todo in todos"
          :key="todo.id"
          :title="todo.title"
          :description="todo.description"
          :due_date="todo.due_date"
          @remove="removeTodo(todo.id)"
          @edit="$router.push(`/todos/${todo.id}/edit`)"
        />
      </div>
    </section>
</template>
