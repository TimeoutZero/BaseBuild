import { UserConfig } from "vite";
import { basebuildCoreConfigSystemFnReturnViteConfig, BasebuildCoreConfigSystemFnViteOptions } from "./strategies/vite/types.js";

export type BasebuildCoreConfigSystemFnOptions = BasebuildCoreConfigSystemFnViteOptions
export type BasebuildCoreConfigSystemFnReturn = basebuildCoreConfigSystemFnReturnViteConfig

export type BasebuildCoreConfigSystemFn = (options: BasebuildCoreConfigSystemFnOptions) => BasebuildCoreConfigSystemFnReturn
export type BasebuildCoreConfigSystemObject = UserConfig

export type BasebuildCoreConfigs = Array<BasebuildCoreConfigSystemFn | BasebuildCoreConfigSystemObject>
export interface BasebuildCoreInitiazeOptions {
  configSystem?: 'vite'
  configs: BasebuildCoreConfigs
}

