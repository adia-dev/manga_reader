/** @type {import('@jest/types').Config.InitialOptions} */
import type { Config } from "jest";

const config: Config = {
  verbose: true,
  testMatch: [
    "<rootDir>/**/*.test.{ts,tsx,js,jsx}",
    "<rootDir>/*.test.{ts,tsx,js,jsx}",
  ],
  collectCoverage: true,
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "\\.(css|less|scss|sss|styl)$": "identity-obj-proxy",
    "\\.(svg)$": "<rootDir>/src/__mocks__/svgTransform.ts",
    axios: "<rootDir>/src/__mocks__/axios.js",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  transform: {
    "^.+\\.(t|j)sx?$": "@swc/jest",
  },
  transformIgnorePatterns: ["/node_modules/"],
  testEnvironment: "jsdom",
};

export default config;
