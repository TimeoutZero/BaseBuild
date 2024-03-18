import { UserConfig, UserConfigFnObject, defineConfig } from "vite"
import buildBasebuildViteConfigFunction from "./vite.config"
import { basebuildConfigBuilderFn } from "@/core/types"

const initializeByVite = (basebuildConfigBuilderFunction: basebuildConfigBuilderFn): UserConfigFnObject => {
  const bbViteConfigFunction = buildBasebuildViteConfigFunction(basebuildConfigBuilderFunction)
  const finalViteConfig = defineConfig(bbViteConfigFunction)
  return finalViteConfig
}

export default initializeByVite