import { UserConfigFnObject } from "vite"
import { ConfigSystemInitializer, ConfigSystemName } from "../types.js"
import initializeByVite from "./vite/initializeByVite.js"
import initializeByVitest from "./vitest/initializeByVitest.js"

const initializeStrategies = {
  vite: initializeByVite,
  vitest: initializeByVitest
}

export { initializeStrategies }
export default initializeStrategies