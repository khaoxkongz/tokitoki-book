import { defineConfig } from "vite-plus";

export default defineConfig({
  fmt: {
    singleAttributePerLine: true,
    printWidth: 120,
    sortTailwindcss: {
      functions: ["clsx", "cn", "cva", "tw"],
    },
    ignorePatterns: [
      "**/node_modules/**",
      "**/dist/**",
      "**/build/**",
      "**/.turbo/**",
      "**/.output/**",
      "**/.tanstack/**",
      "**/.content-collections/**",
    ],
  },
  lint: {
    jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }],
    rules: { "vite-plus/prefer-vite-plus-imports": "error" },
    options: { typeAware: true, typeCheck: true },
    ignorePatterns: [
      "**/node_modules/**",
      "**/dist/**",
      "**/build/**",
      "**/.turbo/**",
      "**/.output/**",
      "**/.tanstack/**",
      "**/.content-collections/**",
    ],
  },
  run: {
    cache: true,
  },
});
