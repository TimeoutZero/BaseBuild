import deepAssign from '../../../utils/deepAssign.js'
import { UserConfig, loadEnv, ConfigEnv } from 'vite'
import debug from 'debug'
import { BasebuildCoreConfigs } from '../../types.js'

const log = debug('basebuild:vite-config')

const createBasebuildViteConfig = ({ command, mode }: ConfigEnv) => {
  const viteConfig: UserConfig = {}
  return viteConfig
}

export const buildBasebuildViteConfigFunction = (configs: BasebuildCoreConfigs) => {
  return (configEnv: ConfigEnv): UserConfig => {
    const bbDefaultViteConfig = createBasebuildViteConfig(configEnv)

    const finalConfig: UserConfig = configs.reduce((mergedConfig, config) => {
      let buildedConfig = config as UserConfig

      if (typeof config === 'function') {
        buildedConfig = config?.({
          ...configEnv,
          basebuildDefaults: mergedConfig as UserConfig,
        }) as UserConfig
      }

      deepAssign(mergedConfig, buildedConfig)
      return mergedConfig as UserConfig
    }, bbDefaultViteConfig) as UserConfig

    log('[pre-defineConfig] final vite config', finalConfig)
    log('[build] rollup options', finalConfig.build.rollupOptions)
    return finalConfig
  }
}

export default buildBasebuildViteConfigFunction