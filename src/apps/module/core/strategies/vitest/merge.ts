import deepAssign from '../../../utils/deepAssign.js'
import { ConfigEnv, UserConfig, UserConfigFnObject } from 'vitest/config'
import debug from 'debug'
import { MergeConfigsFn } from '../../types.js'
import getDefaultBasebuildVitestConfig from './vite.config.js'

const log = debug('basebuild:vite:merge')

export const mergeVitestConfigs: MergeConfigsFn<UserConfigFnObject> = (configs) => {
  return (configEnv: ConfigEnv): UserConfig => {
    const bbDefaultViteConfig = getDefaultBasebuildVitestConfig(configEnv)

    const finalConfig: UserConfig = configs.reduce((mergedConfig, config) => {
      let buildedConfig = config as UserConfig

      if (typeof config === 'function') {
        buildedConfig = config?.({
          ...configEnv,
          basebuild: {
            defaults: mergedConfig,
          }
        }) as UserConfig
      }

      deepAssign(mergedConfig, buildedConfig)
      return mergedConfig as UserConfig
    }, bbDefaultViteConfig) as UserConfig

    log('[pre-defineConfig] final vite config', finalConfig)
    log('[build] rollup options', finalConfig.build?.rollupOptions)
    return finalConfig
  }
}
