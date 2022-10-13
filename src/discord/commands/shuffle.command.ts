import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js';

import { AppName } from '../../constants';

export = {
	data: new SlashCommandBuilder().setName('shuffle').setDescription('Shuffle the queue.'),
	execute: async (interaction: ChatInputCommandInteraction): Promise<void> => {
		const { client, guild } = interaction;

		try {
			const queue = client.player.getQueue(guild);

			if (!queue) {
				await interaction.reply({
					embeds: [
						new EmbedBuilder()
							.setTitle('**💿 │** No audio track')
							.setDescription('There is no audio track in the queue.')
							.setFooter({ text: `${AppName}` }),
					],
					ephemeral: true,
				});
				return;
			}

			queue.shuffle();
			await interaction.reply({
				embeds: [
					new EmbedBuilder()
						.setTitle('**🔀 │** Queue shuffled')
						.setDescription(`The queue of \`${queue.tracks.length + 1}\` audio tracks have been shuffled.`)
						.setFooter({ text: `${AppName}` }),
				],
				ephemeral: true,
			});
		} catch (err) {
			await interaction.reply({
				embeds: [
					new EmbedBuilder()
						.setTitle('**❌ │** Internal server error')
						.setDescription('An error occurred when trying to execute this command.')
						.setFooter({ text: `${AppName}` }),
				],
				ephemeral: true,
			});
			throw err;
		}
	},
};
