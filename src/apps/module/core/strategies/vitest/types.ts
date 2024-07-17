import { ConfigEnv, UserConfig, UserConfigFnObject } from 'vitest/config'

export interface BasebuildCoreConfigSystemFnVitestOptions extends ConfigEnv {
  basebuild: {
    defaults: UserConfig // basebuilded's default vite config
  }
}

export type basebuildCoreConfigSystemFnReturnVitestConfig = UserConfig | UserConfigFnObject