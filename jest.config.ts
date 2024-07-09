/**
 * For a detailed explanation regarding each configuration property, visit:
 */

import type { Config } from 'jest';

const config: Config = {
  testEnvironment: "node",
  clearMocks: true,
  coverageProvider: "v8",
  preset: 'ts-jest/presets/js-with-ts-esm',
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(js)$",
  testPathIgnorePatterns: ["/node_modules/", "/src/apps/legacy/", ".d.ts"],
  reporters: ['default'],
  transform: {
    '^.+\\.(ts|js)$': ['ts-jest', { useESM: true }],
  },
};

export default config;
