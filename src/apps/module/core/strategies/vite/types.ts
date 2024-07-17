import { ConfigEnv, UserConfig, UserConfigFnObject } from 'vite'

export interface BasebuildCoreConfigSystemFnViteOptions extends ConfigEnv {
  basebuild: {
    defaults: UserConfig // basebuilded's default vite config
  }
}

export type basebuildCoreConfigSystemFnReturnViteConfig = UserConfig | UserConfigFnObject