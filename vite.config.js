import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // 產品路徑、開發路徑
  base: process.env.NODE_ENV === 'production' ? '/react-workshop-week3/' : '/',
  plugins: [react()],
})
