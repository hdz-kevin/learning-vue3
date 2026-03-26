<script setup>
import { useBackgroundColor, backgroundColorProps } from "./composables/backgroundColor";

const props = defineProps({
  ...backgroundColorProps,
  circle: {
    required: false,
    type: Boolean,
    default: false,
  },
});

const backgroundColor = useBackgroundColor(props);
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
