import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import { bytecodePlugin } from './scripts/bytecode'
import react from '@vitejs/plugin-react'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin(), bytecodePlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin(), bytecodePlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        crypto: 'crypto-browserify',
        '@renderer': resolve('src/renderer/src')
      }
    },
    plugins: [react()]
  }
})
