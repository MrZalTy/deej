import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js';

import { AppName } from '../../constants';

export = {
	data: new SlashCommandBuilder()
		.setName('queue')
		.setDescription('Display information about the queue.')
		.addNumberOption((option) =>
			option.setName('page').setDescription('Page of the queue to display').setMinValue(1),
		),
	execute: async (interaction: ChatInputCommandInteraction): Promise<void> => {
		const { client, guild } = interaction;

		try {
			const queue = client.player.getQueue(guild.id);

			if (!queue || !queue.playing) {
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

			const page = (interaction.options.getNumber('page') || 1) - 1;
			const totalPages = Math.ceil(queue.tracks.length / 10) || 1;

			if (page > totalPages) {
				await interaction.reply({
					embeds: [
						new EmbedBuilder()
							.setTitle('**📃 │** Invalid page')
							.setDescription(`There is only a total of \`${totalPages}\` pages of audio tracks.`)
							.setFooter({ text: `${AppName}` }),
					],
					ephemeral: true,
				});
				return;
			}

			const currentTrack = queue.current;
			const nextTracks = queue.tracks.slice(page * 10, page * 10 + 10).map((track, i) => {
				return `**💿 │ ${page * 10 + i + 1}.** [${track.title}](${track.url}) - ${track.author}`;
			});

			await interaction.reply({
				embeds: [
					new EmbedBuilder()
						.setTitle(`**💿 │** ${currentTrack.title}`)
						.setDescription(
							`**🎤 │** ${currentTrack.author}\n\n**Next tracks**\n\n${nextTracks.join('\n')}`,
						)
						.setURL(currentTrack.url)
						.setThumbnail(currentTrack.thumbnail)
						.setFooter({
							text: `Page ${page + 1} of ${totalPages} - ${AppName}`,
						}),
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
