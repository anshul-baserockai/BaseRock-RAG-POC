module.exports = {
    // Specifies the root directory for Jest to scan for tests and modules
    roots: ["<rootDir>/src"],
  
    // Transform file extensions using Babel Jest for JSX/TSX
    transform: {
      "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
    },
  
    // Match test files
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  
    // Specify file extensions Jest should resolve
    moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"],
  
    // Mocks static file imports like images and stylesheets
    moduleNameMapper: {
      "\\.(css|less|scss|sass)$": "identity-obj-proxy",
      "\\.(gif|ttf|eot|svg|png|jpg|jpeg)$": "<rootDir>/__mocks__/fileMock.js",
    },
  
    // Setup files for initializing Jest (e.g., Enzyme, React Testing Library)
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  
    // Collect coverage information
    collectCoverage: true,
    collectCoverageFrom: [
      "src/**/*.{js,jsx,ts,tsx}",
      "!src/index.js", // Ignore entry point
      "!src/**/*.d.ts", // Ignore TypeScript declaration files
    ],
    coverageReporters: ["json", "lcov", "text", "clover"],
  
    // Mock for specific environments
    testEnvironment: "jsdom",
  
    // Verbosity and logging
    verbose: true,
  };