import { UserConfigFnObject, defineConfig } from "vite"
import buildBasebuildViteConfigFunction from "./vite.config.js"
import { BasebuildCoreConfigs } from "../../../core/types.js"

const initializeByVite = (configs: BasebuildCoreConfigs): UserConfigFnObject => {
  const bbViteConfigFunction = buildBasebuildViteConfigFunction(configs)
  const finalViteConfig = defineConfig(bbViteConfigFunction)
  return finalViteConfig
}

export default initializeByVite