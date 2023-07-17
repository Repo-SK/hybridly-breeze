export default definePreset({
  name: "hybridly-breeze",
  options: {
    // ...
  },
  handler: async () => {
    await applyNestedPreset({ preset: "hybridly/preset" });
    await extractTemplates();
  },
});
