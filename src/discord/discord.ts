import * as DiscordJS from 'discord.js';
import * as fs from 'fs';
import * as path from 'path';

import { Event } from './discord.type';

const client = new DiscordJS.Client({
	intents: ['Guilds', 'GuildVoiceStates'],
});

function loadEvents(): void {
	const eventsPath = path.join(__dirname, 'events');
	const eventsFiles = fs.readdirSync(eventsPath).filter((file) => file.endsWith('event.ts'));

	eventsFiles.map(async (eventFile) => {
		const filePath = path.join(eventsPath, eventFile);
		const event: Event = await import(filePath);

		if (event.once) {
			client.once(event.name, (...args) => event.execute(...args));
		} else {
			client.on(event.name, (...args) => event.execute(...args));
		}
	});
}

function init(): void {
	loadEvents();
}

export { client, init };
