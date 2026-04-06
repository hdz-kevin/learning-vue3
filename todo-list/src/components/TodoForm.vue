<script setup>
import Btn from "@/components/Btn.vue";
import Spinner from "@/components/Spinner.vue";
import { ref } from "vue";

const props = defineProps({
  initialTitle: String,
  initialDescription: String,
  initialDueDate: String,
  isEditing: Boolean,
  isSubmitting: { type: Boolean, required: true }
});

const title = ref(props.initialTitle ?? "");
const description = ref(props.initialDescription ?? "");
const due_date = ref(props.initialDueDate ?? "");

const emit = defineEmits(["cancel", "submit"]);
</script>

<template>
  <div class="form-container">

    <form @submit.prevent="emit('submit', { title, description, due_date })" class="todo-form">
      <h1 class="form-title">Add Todo</h1>

      <div class="fields">
        <div class="field">
          <label for="title">Title</label>
          <input v-model="title" id="title" type="text" placeholder="Clean my room" />
        </div>
        <div class="field">
          <label for="description">Descripcion</label>
          <input v-model="description" id="description" type="text" placeholder="Sweep and take out the trash" />
        </div>
        <div class="field">
          <label for="due_date">Due Date</label>
          <input v-model="due_date" id="due_date" type="date" />
        </div>
      </div>
      <div class="form-actions">
        <Btn
          @click="emit('cancel')"
          type="button"
          variant="secondary"
          class="cancel-btn"
        >
          Cancel
        </Btn>
        <Btn class="submit-btn" type="submit" :disabled="isSubmitting">
          <Spinner v-if="isSubmitting" />
          <span v-else>{{ isEditing ? 'Save changes' : 'Add Todo' }}</span>
        </Btn>
      </div>
    </form>
  </div>
</template>

<style scoped>
.form-container {
  display: flex;
  justify-content: center;
  padding: 2rem;
}

.todo-form {
  background-color: var(--navbar-color);
  padding: 2rem;
  border-radius: 12px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.form-title {
  margin-top: 0;
}

.fields {
  margin-top: 1.8rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: .5rem;
}

.field label {
  font-size: 1.1rem;
}

.field input {
  background-color: var(--background-color);
  color: var(--text-color);
  border: 2px solid #3d444d;
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 1rem;
  box-sizing: border-box;
}

.field input[type="date"] {
  color: var(--secondary-color);
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
}

.submit-btn {
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
