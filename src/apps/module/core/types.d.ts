
export type BasebuildCoreInitializer = {
  <T>(options: BasebuildCoreInitiazerOptions<T>): T;
  <T, K>(options: BasebuildCoreInitiazerOptions<T>): K;
}

export interface BasebuildCoreInitiazerOptions<T> {
  configSystem?: ConfigSystemName;
  configs: ConfigSystemSetting<T>[]
}


export type ConfigSystemSetting<T> = ConfigSystemFnOptions<T> | ConfigSystemFn<T>
export type ConfigSystemName = 'vite' | 'vitest'
export type ConfigSystemFn<T> = (options: ConfigSystemFnOptions<T>) => T
export interface ConfigSystemFnOptions<T> extends T {
  basebuild?: {
    defaults: T
  }
}

export type ConfigSystemInitializer<T> = (configs: Array<ConfigSystemSetting<T>>) => T
export type ConfigSystemMerger<T, K> = (configs: ConfigSystemSetting<T>[]) => K


