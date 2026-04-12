import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import importPlugin from "eslint-plugin-import";
import jsxA11y from "eslint-plugin-jsx-a11y";
import sonarjs from "eslint-plugin-sonarjs";
import promise from "eslint-plugin-promise";
import prettier from "eslint-config-prettier";

export default [
  {
    ignores: ["dist", "node_modules", "lint-report.json"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  react.configs.flat.recommended,
  react.configs.flat["jsx-runtime"],
  importPlugin.flatConfigs.recommended,
  jsxA11y.flatConfigs.recommended,
  sonarjs.configs.recommended,
  promise.configs["flat/recommended"],
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: globals.browser,
      parserOptions: {
        projectService: {
          allowDefaultProject: ["*.js"],
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      react: { version: "detect" },
      "import/resolver": { typescript: { project: ["./tsconfig.json"] } },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      // ==== JavaScript ====
      "no-var": "error",
      "prefer-const": "error",
      "prefer-arrow-callback": "error",
      "arrow-body-style": ["error", "as-needed"],
      "max-len": ["warn", { code: 120, ignoreUrls: true }],
      "max-lines": ["warn", { max: 500, skipBlankLines: true, skipComments: true }],
      // ==== Import ====
      "import/no-unresolved": "error",
      "import/no-duplicates": "error",
      "import/newline-after-import": "error",
      // ==== Code quality ====
      "sonarjs/no-commented-code": "warn",
      "sonarjs/prefer-read-only-props": "off",
      "sonarjs/pseudo-random": "off",
      "promise/prefer-await-to-then": "warn",
      "promise/no-promise-in-callback": "off",
      // ==== TypeScript ====
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/consistent-type-definitions": "off",
      "@typescript-eslint/consistent-type-imports": ["error", { prefer: "type-imports" }],
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-misused-promises": "error",
      "@typescript-eslint/await-thenable": "error",
      "@typescript-eslint/consistent-type-exports": "error",
      "@typescript-eslint/no-unnecessary-type-assertion": "error",
      // ==== React ====
      "react/react-in-jsx-scope": "off", // JSX transform

      // ==== Import order với alias @/ ====
      "import/order": "off",
    },
  },
  prettier,
  {
    files: ["**/*.js"],
    rules: {
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-return": "off",
      "@typescript-eslint/no-unsafe-argument": "off",
    },
  },
].flat();
