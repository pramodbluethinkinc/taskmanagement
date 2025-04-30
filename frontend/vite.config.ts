import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      'ws://localhost:5173/socket.io': 'http://localhost:5173/socket.io',
    },
  },
  preview: {
    port: 5173,
    proxy: {
      'ws://localhost:5173/socket.io': 'http://localhost:5173/socket.io',
    },
  },
});
