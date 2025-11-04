module.exports = {
	testEnvironment: 'jsdom',
	testEnvironmentOptions: {
		url: 'http://localhost',
	},
	collectCoverage: true,
	coverageDirectory: 'coverage',
	testPathIgnorePatterns: ['/node_modules/', '/dist/'],
	setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
	moduleNameMapper: {
		'\\.(css|less|scss|sass)$': 'identity-obj-proxy',
	},
	transform: {
		'^.+\\.(js|jsx)$': 'babel-jest',
	},
	testMatch: ['<rootDir>/src/**/__tests__/**/*.(js|jsx)', '<rootDir>/src/**/*.(test|spec).(js|jsx)'],
};

