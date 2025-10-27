import antfu from "@antfu/eslint-config";
import nextPlugin from "@next/eslint-plugin-next";

export default antfu(
  {
    type: "app",
    typescript: true,
    formatters: true,
    react: true,
    yaml: true,
    stylistic: {
      indent: 2,
      semi: true,
      quotes: "double",
    },
    ignores: ["src/sanity/types.ts"],
    plugins: {
      "@next/next": nextPlugin,
    },
  },
  {
    rules: {
      "ts/no-redeclare": "off",
      "ts/consistent-type-definitions": ["error", "type"],
      "no-console": ["warn"],
      "antfu/no-top-level-await": ["off"],
      "node/prefer-global/process": ["off"],
      "perfectionist/sort-imports": [
        "error",
        {
          tsconfigRootDir: ".",
        },
      ],
      "unicorn/filename-case": [
        "error",
        {
          case: "kebabCase",
          ignore: ["README.md"],
        },
      ],
      "yaml/no-multiple-empty-lines": ["error", { max: 1 }],
      "yaml/quotes": ["error", { prefer: "double" }],
      "@next/next/no-html-link-for-pages": "off",
      "@next/next/no-img-element": "error",
      "@next/next/no-script-component-in-head": "error",
    },
  },
);
