module.exports = {
  verbose: true,
  testMatch: ["<rootDir>/**/*.test.{js,jsx}", "<rootDir>/*.test.{js,jsx}"],
  collectCoverage: true,
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    "\\.(css|less|scss|sss|styl)$": "identity-obj-proxy",
    "\\.(svg)$": "<rootDir>/__mocks__/svgTransform.js",
    axios: "<rootDir>/__mocks__/axios.js",
  },
  moduleFileExtensions: ["js", "jsx"],
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  transformIgnorePatterns: ["/node_modules/"],
  testEnvironment: "jsdom",
};
