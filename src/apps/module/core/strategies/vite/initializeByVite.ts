import { UserConfig, UserConfigFnObject, defineConfig } from "vite"
import { mergeViteConfigs } from "./merge.js"
import { ConfigSystemInitializer, ConfigSystemSetting } from "../../../core/types.js"

const initializeByVite: ConfigSystemInitializer<UserConfigFnObject> = (configs) => {
  const bbViteConfigFunction = mergeViteConfigs(configs)
  const finalViteConfig = defineConfig(bbViteConfigFunction)
  return finalViteConfig
}

export default initializeByVite