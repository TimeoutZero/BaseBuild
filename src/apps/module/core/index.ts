import debug from 'debug'
import { BasebuildCoreInitializer, BasebuildCoreInitiazerOptions, ConfigSystemFn, ConfigSystemInitializer } from './types.js'
import initializeStrategies from './strategies/index.js'

const log = debug('basebuild:module:core')

export const basebuildfy: BasebuildCoreInitializer = <T>(options: BasebuildCoreInitiazerOptions<T>) => {
  const configSystem = options?.configSystem || 'vite'
  if (!options?.configs?.length) {
    throw new Error('configs array is required')
  }

  const strategy = initializeStrategies[configSystem] as (configs: any) => T;
  const finalConfigSystemResult = strategy(options?.configs)

  log('finalConfigSystemResult', finalConfigSystemResult)
  return finalConfigSystemResult
}

export default basebuildfy