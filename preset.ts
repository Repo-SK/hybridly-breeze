export default definePreset({
  name: "hybridly-breeze",
  options: {
    // ...
  },
  handler: async () => {
    await extractTemplates();
    // ...
  },
});
