<script>
import { BackgroundColor } from './mixins/BackgroundColor';

export default {
  mixins: [BackgroundColor],

  props: {
    circle: {
      required: false,
      type: Boolean,
      default: false,
    },
  },
};
</script>

<template>
  <button
    :style="{ backgroundColor }"
    :class="{ circle }"
    v-bind="$attrs"
  >
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
