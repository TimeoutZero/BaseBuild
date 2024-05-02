/**
 * For a detailed explanation regarding each configuration property, visit:
 */

import type { Config } from 'jest';

const config: Config = {
  testEnvironment: "node",
  clearMocks: true,
  coverageProvider: "v8",
  preset: 'ts-jest',
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  testPathIgnorePatterns: ["/node_modules/", "/dist/", "/src/apps/legacy/"],
};

export default config;
