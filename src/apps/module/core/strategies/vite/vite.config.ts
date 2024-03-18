import deepAssign from '../../../utils/deepAssign.js'
import { UserConfig, loadEnv, ConfigEnv, defineConfig, UserConfigFnObject } from 'vite'
import debug from 'debug'
import { basebuildConfigBuilderFn } from '../../types.js'

const log = debug('basebuild:vite-config')

const buildBasebuildViteConfig = ({ command, mode }: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd(), '')
  const viteConfig: UserConfig = {
    plugins: [],
    define: {
      'process.env.BB_PRODUCT': env.BB_PRODUCT ? JSON.stringify(env.BB_PRODUCT) : '"EXTENSION"',
      'process.env.BB_ENV': env.NODE_ENV ? JSON.stringify(env.NODE_ENV) : '"development"',
      'process.env.BB_BROWSER': env.BB_BROWSER ? JSON.stringify(env.BB_BROWSER) : '"chromium"',
    }
  }

  return viteConfig
}

export const buildBasebuildViteConfigFunction = (hosterViteConfigBuilderFunction?: basebuildConfigBuilderFn) => {
  return (configEnv: ConfigEnv): UserConfig => {
    const bbViteConfig = buildBasebuildViteConfig(configEnv)
    const mergedConfig = {}
    const hosterViteConfig = hosterViteConfigBuilderFunction?.({
      viteEnv: configEnv,
      _defaultBasebuildViteConfig: bbViteConfig,
      // TODO: como o basebuild, o basebuildChild podem ter configurações default ao mesmo tempo que o hoster também pode manipular a config?
    }) || {}

    deepAssign(mergedConfig, bbViteConfig, hosterViteConfig)
    log('mergedConfig', mergedConfig)

    return mergedConfig
  }
}

export default buildBasebuildViteConfigFunction