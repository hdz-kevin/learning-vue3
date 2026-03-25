<script setup>
import { ref } from "vue";
import Btn from "./Btn.vue";
import Spinner from "./Spinner.vue";

const todoTitle = ref("");

const props = defineProps({
  isLoading: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["submit"]);
</script>

<template>
  <form class="add-todo-form">
    <input v-model="todoTitle" type="text" placeholder="Todo Title" />
    <div>
      <Btn
        class="btn"
        :disabled="isLoading"
        @click.prevent="$emit('submit', todoTitle)"
      >
        <Spinner v-if="isLoading" />
        <span v-else>Add Todo</span>
      </Btn>
    </div>
  </form>
</template>

<style scoped>
.add-todo-form {
  display: flex;
  justify-content: space-between;
  gap: 1.5rem;
  margin-bottom: 40px;
}

.add-todo-form input {
  flex: 1;
  border: solid 2px var(--accent-color);
  border-radius: 10px;
  padding: 15px 10px;
  font-size: 18px;
}

.btn {
  height: 100%;
  padding: 0 15px;
}
</style>
