import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
console.log('=== VITE CONFIG TS IS LOADED ===');
export default defineConfig({
  base: '/Testing-app/',
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://62c8d468f852.vps.myjino.ru:49195',
        changeOrigin: true,
      },
      '/testproxy': {
        target: 'http://62c8d468f852.vps.myjino.ru:49195',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/testproxy/, '/api'),
      },
    },
  },
});
