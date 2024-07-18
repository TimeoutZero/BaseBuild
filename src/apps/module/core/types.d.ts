
export interface BasebuildCoreInitiazeOptions {
  configSystem?: ConfigSystemName
  configs: ConfigSystemSetting[]
}

export type ConfigSystemSetting = ConfigSystemFnOptions<T> | ConfigSystemFn<T>
export type ConfigSystemName = 'vite' | 'vitest'
export type ConfigSystemFn<T> = (options: ConfigSystemFnOptions<T>) => T
export interface ConfigSystemFnOptions<T> extends T {
  basebuild: {
    defaults: T
  }
}

export type ConfigSystemInitializer<T> = (configs: ConfigSystemSetting[]) => T
export type ConfigSystemMerger<T> = (configs: ConfigSystemSetting[]) => T


