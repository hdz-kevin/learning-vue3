<script setup>
import Alert from '@/components/Alert.vue';
import TodoForm from '@/components/TodoForm.vue';
import axios from 'axios';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

const isPosting = ref(false)
const alert = reactive({
  show: false,
  message: "",
  variant: "danger",
});

const router = useRouter();

async function post({ title, description, due_date }) {
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

  isPosting.value = true;
  try {
    await axios.post("/api/todos", {
      title,
      description,
      due_date,
    })
    router.push("/");
  } catch (error) {
    console.log(error);
  }
  isPosting.value = false;
}

function showAlert(message, variant = "success") {
  alert.show = true;
  alert.message = message;
  alert.variant = variant;
}

</script>

<template>
  <Alert
    :show="alert.show"
    :message="alert.message"
    :variant="alert.variant"
    @close="alert.show = false"
  />

  <TodoForm :is-submitting="isPosting" @submit="post" />
</template>
