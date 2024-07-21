
export type BasebuildCoreInitializer = {
  <T>(options: BasebuildCoreInitiazerOptions<T>): T;
}

export interface BasebuildCoreInitiazerOptions<T> {
  configSystem?: ConfigSystemName;
  configs: ConfigSystemFn<T>[]
}


// export type ConfigSystemSetting<T> = ConfigSystemFn<T>
export type ConfigSystemName = 'vite' | 'vitest'

type FirstParam<T extends (...args: any) => any> = Parameters<T>[0]
export interface ConfigSystemFnBBOptions<T> {
  basebuild?: {
    defaults?: ReturnType<T>
  }
}
export type ConfigSystemFnOptions<T> = FirstParam<T> & ConfigSystemFnBBOptions<T>
export type ConfigSystemFn<T extends (...args: any) => any> = (options: ConfigSystemFnOptions<T>) => ReturnType<T>


export type ConfigSystemInitializer<T> = (configs: ConfigSystemFn<T>[]) => T
export type ConfigSystemMerger<T, K> = (configs: ConfigSystemFn<T>[]) => K


