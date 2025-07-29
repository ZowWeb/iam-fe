import { resolve } from 'node:path'

import viteReact from '@vitejs/plugin-react'
import linaria from '@wyw-in-js/vite'
import { defineConfig } from 'vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter(),
    viteReact(),
    linaria({
      include: ['**/*.{ts,tsx}'],
      babelOptions: {
        presets: ['@babel/preset-typescript', '@babel/preset-react'],
      },
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
  },
  resolve: {
    alias: {
      '~': resolve(__dirname, './src'),
    },
  },
})
