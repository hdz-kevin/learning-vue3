<script setup>
import Alert from "@/components/Alert.vue";
import Btn from "@/components/Btn.vue";
import Spinner from "@/components/Spinner.vue";
import { useFetch } from "@/composables/fetch";
import axios from "axios";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({ id: String });
const isSubmitting = ref(false);

const router = useRouter();

const alert = reactive({
  show: false,
  message: "",
  variant: "danger",
});

const { data: todo, isLoading } = useFetch(`/api/todos/${props.id}`, {
    onError: () => showAlert("Failed to load todo", "danger"),
});

async function submit() {
  const { id, title } = todo.value;

  if (title.trim() === "") {
    showAlert("Title cannot be empty", "danger");
    return;
  }

  isSubmitting.value = true;
  try {
    await axios.put(`/api/todos/${id}`, todo.value);
    router.push("/");
  } catch (e) {
    showAlert("Failed to editing todo", "danger");
  }
  isSubmitting.value = false;
}

function showAlert(message, variant = "success") {
  alert.show = true;
  alert.message = message;
  alert.variant = variant;
}
</script>

<template>
  <Spinner v-if="isLoading" />

  <Alert
    :show="alert.show"
    :message="alert.message"
    :variant="alert.variant"
    @close="alert.show = false"
  />

  <div v-if="todo" class="edit-todo-container">
    <form class="edit-todo-form" @submit.prevent="submit">
      <h1>Edit Todo</h1>
      <div class="form-group">
        <label for="title">Todo Title</label>
        <input id="title" class="todo-input" type="text" v-model="todo.title" />
      </div>
      <div class="edit-todo-footer">
        <Btn
          @click="$router.back()"
          type="button"
          variant="secondary"
          class="cancel-btn"
        >
          Cancel
        </Btn>
        <Btn type="submit" :disabled="isSubmitting" variant="success" class="save-btn">
          <Spinner v-if="isSubmitting" />
          <span v-else>Save Changes</span>
        </Btn>
      </div>
    </form>
  </div>
</template>

<style scoped>
.edit-todo-container {
  display: flex;
  justify-content: center;
  padding: 2rem;
}

.edit-todo-form {
  background-color: var(--navbar-color);
  padding: 2rem;
  border-radius: 12px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

h1 {
  margin-top: 0;
  margin-bottom: 1.5rem;
  font-weight: 600;
  color: var(--accent-color);
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
  opacity: 0.8;
}

.todo-input {
  width: 100%;
  background-color: var(--background-color);
  color: var(--text-color);
  border: 2px solid #3d444d;
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 1rem;
  transition: border-color 0.2s;
  box-sizing: border-box;
}

.todo-input:focus {
  outline: none;
  border-color: var(--accent-color);
}

.edit-todo-footer {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
}

.save-btn {
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 500;
}

.cancel-btn {
  padding: 10px 20px;
  border-radius: 8px;
  background-color: transparent !important;
  border: 1px solid rgb(68, 67, 67) !important;
}
</style>
