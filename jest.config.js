module.exports = {
   testEnvironment: 'jsdom',
   transform: {
      '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest'
   },
   moduleNameMapper: {
      '^@api$': '<rootDir>/src/utils/burger-api.ts',
      '^@utils-types$': '<rootDir>/src/utils/types.ts',
      '^@components/(.*)$': '<rootDir>/src/components/$1',
      '^@pages/(.*)$': '<rootDir>/src/pages/$1',
      '^@services/(.*)$': '<rootDir>/src/services/$1',
      '^@utils/(.*)$': '<rootDir>/src/utils/$1',
      '\\.(css|scss)$': 'jest-css-modules-transform'
   },
   moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json']
};