module.exports = {
  // example from: https://tailwindcss.com/docs/configuring-variants/
  variants: {
    textColor: ["responsive", "hover", "focus", "group-hover"],
    backgroundColor: ["responsive", "hover", "focus", "group-hover"],
  },
  theme: {
    extend: {
      fontFamily: {
        display: ["Raleway", "sans-serif"],
      },
      screens: {
        sm: { min: "640px", max: "767px" },
        md: { min: "768px", max: "1023px" },
        lg: { min: "1024px", max: "1279px" },
        xl: { min: "1280px", max: "1535px" },
      },
      height: (theme) => ({
        "screen/2": "50vh",
        "screen/4": "25vh",
        "screen-80": "80vh",
        "screen-85": "85vh",
      }),
    },
  },
};
