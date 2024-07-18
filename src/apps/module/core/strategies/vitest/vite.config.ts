import { ConfigEnv, UserConfig } from 'vitest/config'
import debug from 'debug'

const log = debug('basebuild:vitest-config')

export const getDefaultBasebuildVitestConfig = ({ command, mode }: ConfigEnv): UserConfig => {
  const vitestConfig: UserConfig = {}

  log('default basebuild vitest config', vitestConfig)
  return vitestConfig
}

export default getDefaultBasebuildVitestConfig