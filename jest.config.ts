export default {
  testEnvironment: 'jsdom',
  collectCoverage: true,
  coverageReporters: ['json', 'html'],
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      tsconfig: {
        jsx: 'react-jsx',
        esModuleInterop: true,
      },
    }],
  },
  moduleNameMapper: {
    // '\\.(png|jpg|jpeg|gif|svg)$': 'jest-transform-stub',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testTimeout: 60000,
  moduleDirectories: ['node_modules', 'src'],
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.(ts|tsx|js)',
    '<rootDir>/src/**/?(*.)(spec|test).(ts|tsx|js)'
  ],
};
