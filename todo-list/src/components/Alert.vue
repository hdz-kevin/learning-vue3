<script>
export default {
  props: {
    message: {
      required: true,
      type: String,
    },
    show: {
      required: true,
      type: Boolean,
    },
    type: {
      default: "danger",
      validator(value) {
        return ["danger", "warning", "info"].includes(value);
      }
    }
  },

  emits: ['close'],

  computed: {
    backgroundColor() {
      return `var(--${this.type}-color)`;
    },
  },
};
</script>

<template>
  <div v-if="show" class="alert" :style="{ backgroundColor }">
    <div>{{ message }}</div>
    <button @click="$emit('close')" class="close-alert">&times;</button>
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
