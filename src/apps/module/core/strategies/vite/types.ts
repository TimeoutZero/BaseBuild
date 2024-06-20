import { ConfigEnv, UserConfig, UserConfigFnObject } from 'vite'

export interface BasebuildCoreConfigSystemFnViteOptions extends ConfigEnv {
  basebuildDefaults: UserConfig // basebuilded's default vite config
}

export type basebuildCoreConfigSystemFnReturnViteConfig = UserConfig | UserConfigFnObject