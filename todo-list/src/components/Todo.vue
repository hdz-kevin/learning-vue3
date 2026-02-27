<script>
import Btn from "./Btn.vue";
import Pencil from "./icons/Pencil.vue";

export default {
  components: { Btn, Pencil },

  props: {
    title: {
      required: true,
      type: String,
    },
  },

  emits: ["remove"],
};
</script>

<template>
  <div class="todo">
    <p>{{ title }}</p>
    <div class="actions">
      <Btn class="btn" type="secondary" circle @click="$emit('')">
        <Pencil />
      </Btn>
      <Btn class="btn" type="danger" circle @click="$emit('remove')">
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
