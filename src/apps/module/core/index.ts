import debug from 'debug'
import './types.js'
import { BasebuildCoreInitiazeOptions } from './types.js'
import initializeByVite from './strategies/vite/initializeByVite.js'

const log = debug('basebuild:module:core')

const initializeStrategies = {
  vite: initializeByVite
}

export const startBasebuild = (inializeOptions?: BasebuildCoreInitiazeOptions) => {
  if (!inializeOptions?.configs?.length) {
    throw new Error('configs array is required')
  }

  const strategy = initializeStrategies[inializeOptions.configSystem || 'vite']
  const finalViteConfig = strategy(inializeOptions?.configs)

  log('finalViteConfig', finalViteConfig)
  return finalViteConfig
}

export default startBasebuild