import * as dotenv from 'dotenv';

import * as Discord from './discord';
import { logger } from './logger';

async function main(): Promise<void> {
	dotenv.config();

	try {
		await Discord.init();
	} catch (err) {
		logger.error(err.message);
		process.exit(1);
	}
}

main();
