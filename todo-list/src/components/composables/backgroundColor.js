import { computed } from "vue";

export function useBackgroundColor(props) {
  return computed(() => `var(--${props.variant}-color)`);
}

export const backgroundColorProps = {
  variant: {
    required: false,
    type: String,
    default: "success",
    validator(value) {
      const options = ["success", "danger", "warning", "info", "secondary"];

      return options.includes(value);
    },
  },
};
