import { Client, Collection } from 'discord.js';
import * as fs from 'fs';
import * as path from 'path';

import { botConfig } from '../config';
import { Command, Event } from './discord.type';

const client = new Client({
	intents: ['Guilds', 'GuildVoiceStates'],
});

function loadCommands(): void {
	const commandsPath = path.join(__dirname, 'commands');
	const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('command.ts'));

	commandFiles.map(async (commandFile) => {
		const filePath = path.join(commandsPath, commandFile);
		const command: Command = await import(filePath);

		if (!command) {
			return;
		}
		client.commands.set(command.data.name, command);
		await client.application.commands.create(command.data.toJSON());
	});
}

function loadEvents(): void {
	const eventsPath = path.join(__dirname, 'events');
	const eventFiles = fs.readdirSync(eventsPath).filter((file) => file.endsWith('event.ts'));

	eventFiles.map(async (eventFile) => {
		const filePath = path.join(eventsPath, eventFile);
		const event: Event = await import(filePath);

		if (!event) {
			return;
		}
		if (event.once) {
			client.once(event.name, (...args) => event.execute(...args));
		} else {
			client.on(event.name, (...args) => event.execute(...args));
		}
	});
}

async function init(): Promise<void> {
	client.commands = new Collection<string, Command>();

	await client.login(botConfig.token);
	loadCommands();
	loadEvents();
}

export { client, init };
