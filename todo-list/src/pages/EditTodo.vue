<script setup>
import Alert from "@/components/Alert.vue";
import Spinner from "@/components/Spinner.vue";
import TodoForm from "@/components/TodoForm.vue";
import { useFetch } from "@/composables/fetch";
import axios from "axios";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({ id: String });
const isUpdating = ref(false);
const alert = reactive({
  show: false,
  message: "",
  variant: "danger",
});

const router = useRouter();

const { data: todo, isLoading: isFetching } = useFetch(`/api/todos/${props.id}`, {
    onError: () => showAlert("Failed to load todo", "danger"),
});

async function update({ title, description, due_date }) {
  if (title.trim() === "") {
    showAlert("Title cannot be empty", "danger");
    return;
  }

  if (description.trim() === "") {
    showAlert("Description cannot be empty", "danger");
    return;
  }

  if (due_date.trim() === "") {
    showAlert("Due date is required", "danger");
    return;
  }

  isUpdating.value = true;
  try {
    await axios.put(`/api/todos/${props.id}`, {
      title,
      description,
      due_date,
    });
    router.push("/");
  } catch (e) {
    showAlert("Failed to editing todo", "danger");
  }
  isUpdating.value = false;
}

function showAlert(message, variant = "success") {
  alert.show = true;
  alert.message = message;
  alert.variant = variant;
}
</script>

<template>
  <Spinner v-if="isFetching" />

  <Alert
    :show="alert.show"
    :message="alert.message"
    :variant="alert.variant"
    @close="alert.show = false"
  />

  <TodoForm
    v-if="todo"
    :initial-title="todo.title"
    :initial-description="todo.description"
    :initial-due-date="todo.due_date"
    :is-editing="true"
    :is-submitting="isUpdating"
    @submit="update"
  />
</template>
