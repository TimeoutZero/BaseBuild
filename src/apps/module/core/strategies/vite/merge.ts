import deepAssign from '../../../utils/deepAssign.js'
import { ConfigEnv, UserConfig, UserConfigFnObject } from 'vite'
import debug from 'debug'
// import { ConfigSystemMerger } from '../../types.js'
import getDefaultBasebuildViteConfig from './vite.config.js'

const log = debug('basebuild:vite:merge')

export const mergeViteConfigs = (configs) => {
  return (configEnv: ConfigEnv): UserConfig => {
    const bbDefaultViteConfig = getDefaultBasebuildViteConfig(configEnv)

    const finalConfig: UserConfig = configs.reduce((mergedConfig, config) => {
      let buildedConfig = config as UserConfig

      if (typeof config === 'function') {
        buildedConfig = config?.({
          ...configEnv,
          basebuild: {
            defaults: mergedConfig as UserConfig,
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
