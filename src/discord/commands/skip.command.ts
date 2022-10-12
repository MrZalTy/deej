import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js';

export = {
	data: new SlashCommandBuilder().setName('skip').setDescription('Skip the currently playing audio track.'),
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

		const track = queue.current;

		queue.skip();
		await interaction.reply({
			embeds: [
				new EmbedBuilder()
					.setTitle('**⏭️ │** Audio track skipped')
					.setDescription(
						`**💿 │** ${track.title}\n\n**🎤 │** ${track.author}\n\n**🕗 │** ${track.duration}\n\nThe track has been skipped.`,
					)
					.setURL(track.url)
					.setThumbnail(track.thumbnail)
					.setFooter({ text: `${client.user.username}` }),
			],
			ephemeral: true,
		});
	},
};
