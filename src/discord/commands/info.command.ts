import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js';

export = {
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('Display information about the currently playing audio track.'),
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
		const progressBar = queue.createProgressBar({
			length: 19,
			timecodes: true,
		});

		await interaction.reply({
			embeds: [
				new EmbedBuilder()
					.setTitle(`**💿 │** ${track.title}`)
					.setDescription(`**🎤 │** ${track.author}\n\n**🕗 │** ${track.duration}\n\n${progressBar}`)
					.setURL(track.url)
					.setThumbnail(track.thumbnail)
					.setFooter({ text: `${client.user.username}` }),
			],
			ephemeral: true,
		});
	},
};
