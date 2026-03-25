<script setup>
import Modal from "./Modal.vue";
import Btn from "./Btn.vue";

defineProps(["modelValue", "show"]);

defineEmits(["submit", "close", "update:modelValue"]);
</script>

<template>
  <Modal :show="show" @close="$emit('close')">
    <template #header>
      <h2>Edit Todo</h2>
    </template>

    <template #body>
      <form class="edit-todo-form" @submit.prevent="$emit('submit')">
        <label for="title">Todo Title</label>
        <input
          id="title"
          type="text"
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
        />
      </form>
    </template>

    <template #footer>
      <div class="edit-todo-modal-footer">
        <Btn @click="$emit('submit')">Submit</Btn>
        <Btn variant="danger" @click="$emit('close')">Close</Btn>
      </div>
    </template>
  </Modal>
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
