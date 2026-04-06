import { reactive } from "vue";

export function useAlert() {
  const alert = reactive({
    show: false,
    message: "",
    variant: "danger",
  });

  /**
   * 
   * @param {String} message 
   * @param {"success" | "danger" | "warning" | "info" | "secondary"} variant
   */
  function showAlert(message, variant = "danger") {
    alert.show = true;
    alert.message = message;
    alert.variant = variant;
  }

  return {
    alert,
    showAlert,
  }
}
