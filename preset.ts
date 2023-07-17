export default definePreset({
  name: "hybridly-breeze",
  options: {
    // ...
  },
  handler: async () => {
    await applyNestedPreset({ preset: "hybridly/preset" });
    await extractTemplates();

    await editFiles({
      title: "change db driver to sqlite",
      files: ".env",
      operations: [
        {
          type: "update-content",
          update: (content) =>
            content.replace("DB_CONNECTION=mysql", "DB_CONNECTION=sqlite"),
        },
        {
          type: "remove-line",
          match: /DB_HOST/,
          count: 5,
        },
      ],
    });
  },
});
