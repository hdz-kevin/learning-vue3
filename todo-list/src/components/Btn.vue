<script>
export default {
  props: {
    type: {
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
  },

  computed: {
    backgroundColor() {
      return `var(--${this.type}-color)`;
    },
  },

  emits: ["click"],
};
</script>

<template>
  <button
    @click.prevent="$emit('click')"
    :style="{ backgroundColor }"
    :class="{ circle }"
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

.circle {
  border-radius: 50%;
}
</style>
