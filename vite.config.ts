//import { defineConfig } from 'vite';
//import react from '@vitejs/plugin-react';
//
// https://vitejs.dev/config/
//export default defineConfig({
//  plugins: [react()],
//  optimizeDeps: {
//    exclude: ['lucide-react'],
//  },
//});
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Frontend port
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5137', // Backend URL
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
