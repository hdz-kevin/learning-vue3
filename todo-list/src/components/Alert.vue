<script setup>
import { useBackgroundColor, backgroundColorProps } from "./composables/backgroundColor";

const props = defineProps({
  ...backgroundColorProps,
  message: {
    required: true,
    type: String,
  },
  show: {
    required: true,
    type: Boolean,
  },
});

const emit = defineEmits(["close"]);

const backgroundColor = useBackgroundColor(props);

function close() {
  emit("close");
}
</script>

<template>
  <div v-if="show" class="alert" :style="{ backgroundColor }">
    <div>{{ message }}</div>
    <button @click="close" class="close-alert">&times;</button>
  </div>
</template>

<style scoped>
.alert {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 12px 20px;
  border-radius: 15px;
  font-size: 18px;
}

.close-alert {
  background: none;
  color: var(--text-color);
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}
</style>
