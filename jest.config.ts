import type { JestConfigWithTsJest } from "ts-jest";

const config: JestConfigWithTsJest = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": [ 'ts-jest', { useESM: true } ]
  },
  moduleNameMapper: { '^(\\.{1,2}/.*)\\.tsx?$': '$1' }
}

export default config