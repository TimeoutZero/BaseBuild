import { ConfigEnv, UserConfig, UserConfigFnObject, UserConfig as ViteUserConfig } from 'vite'
import { defineConfig, loadEnv } from 'vite'
import { buildBBViteConfigFunction  } from './vite.config.js'
import debug from 'debug'
import './types.js'
import { hosterViteConfigFn } from './types.js'

const log = debug('bbWebExtensions:module:core')

export const bbWebExtensions = (hosterViteConfigFunction?: hosterViteConfigFn) => {
  const bbViteConfigFunction = buildBBViteConfigFunction(hosterViteConfigFunction)
  const finalViteConfig = defineConfig(bbViteConfigFunction)
  log('finalViteConfig', finalViteConfig)
  return finalViteConfig
}