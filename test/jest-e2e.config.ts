import type { Config } from 'jest';

export default async (): Promise<Config> => {
	return {
		rootDir: '..',
		testEnvironment: 'node',
		testRegex: '.*\\.e2e-spec\\.ts$',
		collectCoverage: false,
		collectCoverageFrom: ['src/**/*.{js,ts}'],
		coverageDirectory: '<rootDir>/coverage-e2e',
		passWithNoTests: true,
		verbose: true,
	};
};
