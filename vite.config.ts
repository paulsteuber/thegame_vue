import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  optimizeDeps: {
    include: [
      "vue",
      "@vue/composition-api",
      "vue-router",
      "ref",
      "computed",
      "reactive",
    ],
  },
});
