import { UserConfigFnObject as VitestConfigFnObject, defineConfig } from "vitest/config"
import { mergeVitestConfigs } from "./merge.js"
import { ConfigSystemInitializer } from "../../types.js"

const initializeByVitest: ConfigSystemInitializer<VitestConfigFnObject> = (configs) => {
  const bbViteConfigFunction = mergeVitestConfigs(configs)
  const finalViteConfig = defineConfig(bbViteConfigFunction)
  return finalViteConfig
}

export default initializeByVitest