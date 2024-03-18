import deepAssign from '../utils/deepAssign.js'
import vue from '@vitejs/plugin-vue'
import { UserConfig, loadEnv, ConfigEnv, defineConfig, UserConfigFnObject } from 'vite'
import debug from 'debug'
import { hosterViteConfigFn } from './types.js'


const log = debug('bbWebExtensions:vite-config')

const buildBBViteConfig = ({ command, mode }: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd(), '')
  const viteConfig: UserConfig = {
    plugins: [vue()],
    define: {
      'process.env.BB_PRODUCT': env.BB_PRODUCT ? JSON.stringify(env.BB_PRODUCT) : '"EXTENSION"',
      'process.env.BB_ENV': env.NODE_ENV ? JSON.stringify(env.NODE_ENV) : '"development"',
      'process.env.BB_BROWSER': env.BB_BROWSER ? JSON.stringify(env.BB_BROWSER) : '"chromium"',
    }
  }

  return viteConfig
}

export const buildBBViteConfigFunction = (hosterViteConfigFunction?: hosterViteConfigFn) => {
  return (configEnv: ConfigEnv): UserConfig => {
    const bbViteConfig = buildBBViteConfig(configEnv)
    const mergedConfig = {}
    const hosterViteConfig = hosterViteConfigFunction?.({
      viteEnv: configEnv,
      defaultBBViteConfig: bbViteConfig
    }) || {}

    deepAssign(mergedConfig, bbViteConfig, hosterViteConfig)
    log('mergedConfig', mergedConfig)

    return mergedConfig
  }
}

export default buildBBViteConfigFunction