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
  circle: {
    required: false,
    type: Boolean,
    default: false,
  },
});

const backgroundColor = computed(() => `var(--${props.variant}-color)`);
</script>

<template>
  <button :style="{ backgroundColor }" :class="{ circle }" v-bind="$attrs">
    <slot />
  </button>
</template>

<style scoped>
button {
  color: var(--text-color);
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

button:disabled {
  opacity: 60%;
  cursor: default;
}

.circle {
  border-radius: 50%;
}
</style>
