module.exports = {
  semi: true,
  singleQuote: true,
  trailingComma: "all",
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,

  // Плагины должны быть здесь
  plugins: ["prettier-plugin-organize-imports"],

  // Опции плагинов работают в основном конфиге
  // когда используются через prettier.config.js
  organizeImports: true,
  importOrder: [
    "^@angular/(.*)$",
    "^@nestjs/(.*)$",
    "^@(.*)$",
    "^[a-z]",
    "^~/(.*)$",
    "^@/(.*)$",
    "^[./]",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,

  overrides: [
    {
      files: "*.html",
      options: {
        parser: "angular",
        htmlWhitespaceSensitivity: "css",
      },
    },
  ],
};
