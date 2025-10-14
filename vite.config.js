import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const config = {
    plugins: [react()],
    server: {
      port: 3001,
    },
  };
  
  if (command === 'build') {
    config.base = '/se_project_final/';
  }
  
  return config;
});
