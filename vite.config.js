import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Export Vite config with React plugin
export default defineConfig({
  plugins: [react()],
});
