import { UserConfigFnObject, defineConfig } from "vitest/config"
import { mergeViteConfigs } from "./merge.js"
import { BasebuildCoreConfigs } from "../../types.d.js"

const initializeByVitest = (configs: BasebuildCoreConfigs): UserConfigFnObject => {
  const bbViteConfigFunction = mergeViteConfigs(configs)
  const finalViteConfig = defineConfig(bbViteConfigFunction)
  return finalViteConfig
}

export default initializeByVitest