import { ConfigEnv, UserConfig } from "vite";

export interface BasebuildInitializeByViteOptions {
  viteEnv: ConfigEnv
  _defaultBasebuildViteConfig: UserConfig // core default vite config
  defaultBasebuidConfig: UserConfig // basebuilded's default vite config
}

export interface BasebuildInitiazeOptions {
  ecossystem: 'vite'
  configBuilder?: basebuildConfigBuilderFn
}

export type basebuildEcossystemsBuildersOptions = BasebuildInitializeByViteOptions

//export type basebuildConfigBuilderFn = (options: BasebuildInitializeByViteOptions) => UserConfig
export type basebuildConfigBuilderFn = (options: basebuildEcossystemsBuildersOptions) => UserConfig
