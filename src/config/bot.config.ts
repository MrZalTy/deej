import * as env from 'env-var';

export const botConfig = {
	token: env.get('BOT_TOKEN').required(true).asString(),
	activityName: env.get('BOT_ACTIVITY_NAME').default('music').asString(),
	logs: {
		combinedPath: env.get('BOT_LOGS_COMBINED_PATH').default('logs/combined.log').asString(),
		errorPath: env.get('BOT_LOGS_ERROR_PATH').default('logs/error.log').asString(),
	},
};
