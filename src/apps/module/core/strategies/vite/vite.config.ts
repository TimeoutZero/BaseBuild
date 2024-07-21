import { ConfigEnv, UserConfig } from 'vite'
import debug from 'debug'

const log = debug('basebuild:vite-config')

export const getDefaultBasebuildViteConfig = ({ command, mode }: ConfigEnv): UserConfig => {
  const viteConfig: UserConfig = {}

  log('default basebuild vite config', viteConfig)
  return viteConfig
}

export default getDefaultBasebuildViteConfig