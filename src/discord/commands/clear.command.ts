import { CommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js';

export = {
	data: new SlashCommandBuilder().setName('clear').setDescription('Clear the queue.'),
	execute: async (interaction: CommandInteraction): Promise<void> => {
		const { client, guild } = interaction;

		if (!guild) {
			return;
		}

		const queue = client.player.getQueue(guild);

		if (!queue) {
			await interaction.reply({
				embeds: [
					new EmbedBuilder()
						.setTitle('**💿 │** No audio track')
						.setDescription('There is no audio track in the queue.')
						.setFooter({ text: `${client.user.username}` }),
				],
				ephemeral: true,
			});
			return;
		}

		await queue.destroy();
		await interaction.reply({
			embeds: [
				new EmbedBuilder()
					.setTitle('**🗑️ │** Queue cleared')
					.setDescription('The queue has been cleared.')
					.setFooter({ text: `${client.user.username}` }),
			],
			ephemeral: true,
		});
	},
};
