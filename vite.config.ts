/// <reference types="vite/client" />
import react from "@vitejs/plugin-react-swc";
import path from "path";

/**
 * @type {import('vite').UserConfig}
 */
const config = {
  server: {
    host: "::",
    port: 5173,
    hmr: {
      overlay: false,
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        rewrite: (pathStr: string) => pathStr.replace(/^\/api/, '/api'),
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
};

export default config;
