import type { Config } from 'jest';

export default async (): Promise<Config> => {
	return {
		rootDir: '.',
		testEnvironment: 'node',
		testRegex: '.*\\.spec\\.ts$',
		collectCoverage: false,
		collectCoverageFrom: ['src/**/*.{js,ts}'],
		coverageDirectory: '<rootDir>/coverage',
		passWithNoTests: true,
		verbose: true,
	};
};
