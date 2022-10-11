import * as DiscordJS from 'discord.js';

const client = new DiscordJS.Client({
	intents: ['Guilds', 'GuildVoiceStates'],
});

export { client };
