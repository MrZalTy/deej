import { ActivityType, Client } from 'discord.js';

import { botConfig } from '../../config';
import { AppName } from '../../constants';
import { logger } from '../../logger';

export = {
	name: 'ready',
	once: true,
	execute: async (client: Client): Promise<void> => {
		client.user.setActivity(botConfig.activityName, { type: ActivityType.Listening });
		logger.info(`Guilds: ${client.guilds.cache.map((guild) => guild.name).join(', ')}`);
		logger.info(`${AppName} application successfully started`);
	},
};
