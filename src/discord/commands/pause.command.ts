import { CommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js';

export = {
	data: new SlashCommandBuilder().setName('pause').setDescription('Pause the player.'),
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

		queue.setPaused(true);
		await interaction.reply({
			embeds: [
				new EmbedBuilder()
					.setTitle(`**⏸️ │** Player paused`)
					.setDescription('The player has been paused.\n\nUse `/resume` to resume the player.')
					.setFooter({ text: `${client.user.username}` }),
			],
			ephemeral: true,
		});
	},
};
