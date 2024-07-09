/**
 * For a detailed explanation regarding each configuration property, visit:
 */

import type { Config } from 'jest';

const config: Config = {
  testEnvironment: "node",
  clearMocks: true,
  coverageProvider: "v8",
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(js)$",
  testPathIgnorePatterns: ["/node_modules/", "/src/apps/legacy/", ".d.ts"],
  reporters: ['default'],
};

export default config;
