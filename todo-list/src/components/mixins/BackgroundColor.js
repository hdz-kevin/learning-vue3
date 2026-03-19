const BackgroundColor = {
  props: {
    variant: {
      required: false,
      type: String,
      default: "success",
      validator(value) {
        const options = ["success", "danger", "warning", "info", "secondary"];

        return options.includes(value);
      },
    },
  },

  computed: {
    backgroundColor() {
      return `var(--${this.variant}-color)`;
    },
  },
};

export { BackgroundColor };
