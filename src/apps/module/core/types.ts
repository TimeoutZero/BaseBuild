
export type GenericFunction = (...args: any) => any

export type BasebuildCoreInitializer = {
  <T extends GenericFunction>(options: BasebuildCoreInitializerOptions<T>): T;
}

export interface BasebuildCoreInitializerOptions<T extends GenericFunction> {
  configSystem?: ConfigSystemName;
  configs: ConfigSystemFn<T>[]
}


// export type ConfigSystemSetting<T> = ConfigSystemFn<T>
export type ConfigSystemName = 'vite' | 'vitest'

type FirstParam<T extends GenericFunction> = Parameters<T>[0]
export interface ConfigSystemFnBBOptions<T extends GenericFunction> {
  basebuild?: {
    defaults?: ReturnType<T>
  }
}
export type ConfigSystemFnOptions<T extends GenericFunction> = FirstParam<T> & ConfigSystemFnBBOptions<T>
export type ConfigSystemFn<T extends GenericFunction> = (options: ConfigSystemFnOptions<T>) => ReturnType<T>


export type ConfigSystemInitializer<T extends GenericFunction> = (configs: ConfigSystemFn<T>[]) => T
export type ConfigSystemMerger<T extends GenericFunction, K> = (configs: ConfigSystemFn<T>[]) => K


