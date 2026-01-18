import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import path from 'path' 

export default defineConfig({
  plugins: [tanstackRouter({
      routesDirectory: path.resolve(__dirname, './src/routes'), 
      generatedRouteTree: path.resolve(__dirname, './src/routeTree.gen.ts'),
    }),tailwindcss(), react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), 
    },
  },
})