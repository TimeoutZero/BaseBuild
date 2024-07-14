import { resolve } from 'node:path'

import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(process.cwd(), './src')
    }
  },
  test: {
    // Opções de configuração do Vitest
    globals: true,
    environment: 'node',
    // Outras configurações específicas do projeto
    exclude: ['**/node_modules/**', '**/dist/**', './src/apps/legacy/**'],
  },
})