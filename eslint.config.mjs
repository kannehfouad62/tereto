import js from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";

export default [
  // ✅ Ignore Node scripts + build output
  {
    ignores: ["src/scripts/**", ".next/**", "node_modules/**"],
  },

  js.configs.recommended,

  {
    plugins: { "@next/next": nextPlugin },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
    },
  },
];
