import { UserConfigFnObject, defineConfig } from "vite"
import { mergeViteConfigs } from "./merge.js"
import { BasebuildCoreConfigs } from "../../../core/types.js"

const initializeByVite = (configs: BasebuildCoreConfigs): UserConfigFnObject => {
  const bbViteConfigFunction = mergeViteConfigs(configs)
  const finalViteConfig = defineConfig(bbViteConfigFunction)
  return finalViteConfig
}

export default initializeByVite