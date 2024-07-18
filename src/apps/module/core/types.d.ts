
export interface BasebuildCoreInitiazeOptions {
  configSystem?: ConfigSystemName
  configs: EcosystemConfigs
}

export type EcosystemConfigs = Array<ConfigSystemFnOptions<T> | ConfigSystemFn<T>>
export type ConfigSystemName = 'vite' | 'vitest'
export type ConfigSystemFn<T> = (options: ConfigSystemFnOptions<T>) => T
export interface ConfigSystemFnOptions<T> extends T {
  basebuild: {
    defaults: T
  }
}

export type ConfigSystemInitializer<T> = (configs: EcosystemConfigs) => T
export type ConfigSystemMerger<T> = (configs: EcosystemConfigs) => T


