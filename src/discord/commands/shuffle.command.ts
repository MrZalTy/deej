import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js';

export = {
	data: new SlashCommandBuilder().setName('shuffle').setDescription('Shuffle the queue.'),
	execute: async (interaction: ChatInputCommandInteraction): Promise<void> => {
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

		queue.shuffle();
		await interaction.reply({
			embeds: [
				new EmbedBuilder()
					.setTitle('**🔀 │** Queue shuffled')
					.setDescription(`The queue of \`${queue.tracks.length + 1}\` audio tracks have been shuffled.`)
					.setFooter({ text: `${client.user.username}` }),
			],
			ephemeral: true,
		});
	},
};
