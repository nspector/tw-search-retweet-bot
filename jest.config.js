module.exports = {
  "testEnvironment": "node",
  transform: {
      '^.+\\.ts$': 'ts-jest',
  },
  "moduleNameMapper": {
    '^#core/(.*)$': '<rootDir>/src/core/$1',
    '^#utils/(.*)$': '<rootDir>/src/utils/$1',
    '^#tools/(.*)$': '<rootDir>/src/utils/tools/$1',
    '^#controller/(.*)$': '<rootDir>/src/controller/$1'
  },
  "maxWorkers": 1
};
