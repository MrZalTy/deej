import { CommandInteraction } from 'discord.js';

export = {
	name: 'interactionCreate',
	once: false,
	execute: async (interaction: CommandInteraction): Promise<void> => {
		if (!interaction.isCommand()) {
			return;
		}

		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			return;
		}
		await command.execute(interaction.client, interaction);
	},
};
