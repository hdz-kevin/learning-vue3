<script setup>
import { onBeforeUnmount, onMounted, useTemplateRef } from "vue";

defineProps({
  show: {
    required: false,
    type: Boolean,
    default: false,
  },
});

const modal = useTemplateRef("modal");

const emit = defineEmits(["close"]);

function clickListener(e) {
  if (e.target === modal.value) {
    emit("close");
  }
}

function keyListener(e) {
  if (e.key === "Escape") {
    emit("close");
  }
}

onMounted(() => {
  window.addEventListener("click", clickListener);
  window.addEventListener("keydown", keyListener);
});

onBeforeUnmount(() => {
  window.removeEventListener("click", clickListener);
  window.removeEventListener("keydown", keyListener);
});
</script>

<template>
  <div ref="modal" v-show="show" class="modal">
    <div class="modal-content">
      <div class="modal-header">
        <slot name="header" />
      </div>

      <div class="modal-body">
        <slot name="body" />
      </div>

      <div class="modal-footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.6);
}

.modal-content {
  position: relative;
  background-color: #fefefe;
  margin: auto;
  padding: 0;
  width: 60%;
  max-width: 800px;
  box-shadow:
    0 4px 8px 0 rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);
  -webkit-animation-name: animatetop;
  -webkit-animation-duration: 0.4s;
  animation-name: animatetop;
  animation-duration: 0.4s;
}

/* Animation */
@-webkit-keyframes animatetop {
  from {
    top: -300px;
    opacity: 0;
  }
  to {
    top: 0;
    opacity: 1;
  }
}

@keyframes animatetop {
  from {
    top: -300px;
    opacity: 0;
  }
  to {
    top: 0;
    opacity: 1;
  }
}

.modal-header {
  padding: 2px 18px;
  background-color: rgb(83, 83, 93);
  color: white;
}

.modal-body {
  padding: 20px 18px;
  background-color: var(--background-color);
}

.modal-footer {
  background-color: rgb(83, 83, 93);
  color: white;
  padding: 20px 18px;
}
</style>
