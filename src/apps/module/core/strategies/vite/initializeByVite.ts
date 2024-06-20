import { UserConfigFnObject, defineConfig } from "vite"
import buildBasebuildViteConfigFunction from "./vite.config"
import { BasebuildCoreConfigs } from "../../../core/types"

const initializeByVite = (configs: BasebuildCoreConfigs): UserConfigFnObject => {
  const bbViteConfigFunction = buildBasebuildViteConfigFunction(configs)
  const finalViteConfig = defineConfig(bbViteConfigFunction)
  return finalViteConfig
}

export default initializeByVite