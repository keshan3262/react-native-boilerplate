module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            components: "./src/components",
            i18n: "./src/i18n",
            pages: "./src/pages",
            layouts: "./src/layouts",
          },
        },
      ],
    ],
  };
};
