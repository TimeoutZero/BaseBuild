/**
 * For a detailed explanation regarding each configuration property, visit:
 */

import type {Config} from 'jest';

const config: Config = {
  clearMocks: true,
  coverageProvider: "v8",
  preset: 'ts-jest',
  testPathIgnorePatterns: ["/node_modules/", "/dist/", "/src/apps/legacy/"],
};

export default config;
