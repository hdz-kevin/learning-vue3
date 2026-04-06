<script setup>
import Alert from '@/components/Alert.vue';
import TodoForm from '@/components/TodoForm.vue';
import { useAlert } from '@/composables/useAlert';
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const isPosting = ref(false)

const { alert, showAlert } = useAlert();
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
