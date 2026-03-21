<script setup>
import { computed } from "vue";

const props = defineProps({
  variant: {
    required: false,
    type: String,
    default: "success",
    validator(value) {
      const options = ["success", "danger", "warning", "info", "secondary"];

      return options.includes(value);
    },
  },
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

const backgroundColor = computed(() => `var(--${props.variant}-color)`);

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
