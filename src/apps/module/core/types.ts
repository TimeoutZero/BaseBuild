import { ConfigEnv, UserConfig } from "vite";

export interface BasebuildWebExtensionsInitializeOptions {
  viteEnv: ConfigEnv
  defaultBBViteConfig: UserConfig
}

export type hosterViteConfigFn = (options: BasebuildWebExtensionsInitializeOptions) => UserConfig