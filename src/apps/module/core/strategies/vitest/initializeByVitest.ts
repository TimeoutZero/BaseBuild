import { UserConfigFnObject, defineConfig } from "vitest/config"
import { mergeVitestConfigs } from "./merge.js"
import { ConfigSystemInitializer } from "../../types.d.js"

const initializeByVitest: ConfigSystemInitializer<UserConfigFnObject> = (configs) => {
  const bbViteConfigFunction = mergeVitestConfigs(configs)
  const finalViteConfig = defineConfig(bbViteConfigFunction)
  return finalViteConfig
}

export default initializeByVitest