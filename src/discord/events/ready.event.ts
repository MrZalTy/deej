import { ActivityType, Client } from 'discord.js';

import { botConfig } from '../../config';
import { logger } from '../../logger';

export = {
	name: 'ready',
	once: true,
	execute: async (client: Client): Promise<void> => {
		client.user.setActivity(botConfig.activityName, { type: ActivityType.Listening });
		logger.info('DeeJ application successfully started');
	},
};
