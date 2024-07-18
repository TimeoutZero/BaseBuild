import debug from 'debug'
import { BasebuildCoreInitiazeOptions, ConfigSystemInitializer } from './types.js'
import initializeStrategies from './strategies/index.js'

const log = debug('basebuild:module:core')

export const basebuildfy = (inializeOptions: BasebuildCoreInitiazeOptions = { configs: [] }) => {
  const configSystem = inializeOptions?.configSystem || 'vite'
  if (!inializeOptions?.configs?.length) {
    throw new Error('configs array is required')
  }

  const strategy: ConfigSystemInitializer<any> = initializeStrategies[configSystem]
  const finalViteConfig = strategy(inializeOptions?.configs)

  log('finalViteConfig', finalViteConfig)
  return finalViteConfig
}

export default basebuildfy