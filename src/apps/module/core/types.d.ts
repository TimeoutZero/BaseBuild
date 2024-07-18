export module 'basebuild' {

}
export type ConfigSystemInitializer<T> = (configs: EcosystemConfigs) => T

export type ConfigSystemFn<T> = (options: ConfigSystemFnOptions<T>) => T
// export type ConfigSystemFn<T, K> = (options: ConfigSystemFnOptions<T>) => K
// export type ConfigSystemFnReturn<T> = T


export interface ConfigSystemFnOptions<T> extends T {
  basebuild: {
    defaults: T
  }
}

export type MergeConfigsFn<T> = (configs: EcosystemConfigs) => T
// export type MergeConfigsFn<T, K> = (configs: EcosystemConfigs) => MergeConfigsFnReturn<T, K>
// export type MergeConfigsFnReturn<T> = (options: ConfigSystemFnOptions<T>) => ConfigSystemFnReturn<T>
// export type MergeConfigsFnReturn<T, K> = (options: ConfigSystemFnOptions<T>) => ConfigSystemFnReturn<K>

export type EcosystemConfigs = Array<ConfigSystemFnOptions<T> | ConfigSystemFn<T> | ConfigSystemFn<T,K>>
export type ConfigSystemName = 'vite' | 'vitest'

export interface BasebuildCoreInitiazeOptions {
  configSystem?: ConfigSystemName
  configs: EcosystemConfigs
}
