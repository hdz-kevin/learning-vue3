<script setup>
import Btn from "./Btn.vue";
import Pencil from "./icons/Pencil.vue";

const props = defineProps({
  title: {
    required: true,
    type: String,
  },
  description: String,
  due_date: {
    required: true,
    type: String,
  },
});

defineEmits(["remove", "edit"]);
</script>

<template>
  <div class="todo">
    <p>{{ title }}</p>
    <!-- Todo: Color mas tenue u opaco para todos sin descripcion -->
    <p>{{ description ?? "Sin description" }}</p>
    <p>{{ due_date }}</p>
    <div class="actions">
      <Btn class="btn" variant="secondary" circle @click="$emit('edit')">
        <Pencil />
      </Btn>
      <Btn class="btn" variant="danger" circle @click="$emit('remove')">
        &times;
      </Btn>
    </div>
  </div>
</template>

<style scoped>
.todo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--accent-color);
  margin-top: 20px;
  padding: 0 20px 0 20px;
  border-radius: 10px;
}

.todo p {
  font-size: 18px;
}

.actions {
  display: flex;
  gap: 10px;
}

.btn {
  height: 35px;
  width: 35px;
  font-size: 22px;
}
</style>
