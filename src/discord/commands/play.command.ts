import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { QueryType } from 'discord-player';

export = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Play music')
		.addSubcommand((subcommand) =>
			subcommand
				.setName('track')
				.setDescription('Play a single audio track based on provided keywords or from a URL.')
				.addStringOption((option) =>
					option.setName('track').setDescription('Name or URL of the audio track').setRequired(true),
				),
		)
		.addSubcommand((subcommand) =>
			subcommand
				.setName('playlist')
				.setDescription('Play a list of audio tracks from a URL.')
				.addStringOption((option) =>
					option.setName('playlist').setDescription('URL of the audio playlist').setRequired(true),
				),
		),
	execute: async (interaction: ChatInputCommandInteraction): Promise<void> => {
		const { client, guild } = interaction;

		if (!guild) {
			return;
		}

		const member = guild.members.cache.get(interaction.user.id);

		if (!member.voice.channel)
			await interaction.reply({
				embeds: [
					new EmbedBuilder()
						.setTitle(`**🔇 │** Voice channel not found`)
						.setDescription('You need to be in a voice channel to use this command.')
						.setFooter({ text: `${client.user.username}` }),
				],
				ephemeral: true,
			});

		const queue = await client.player.createQueue(guild);

		if (interaction.options.getSubcommand() === 'track') {
			const query = interaction.options.getString('track', true);
			const result = await client.player.search(query, {
				requestedBy: interaction.user,
				searchEngine: QueryType.AUTO,
			});

			if (result.tracks.length === 0) {
				await interaction.reply({
					embeds: [
						new EmbedBuilder()
							.setTitle('**💿 │** Audio track not found')
							.setDescription('There is no audio track found.')
							.setFooter({ text: `${client.user.username}` }),
					],
					ephemeral: true,
				});
			}

			const track = result.tracks[0];

			await queue.addTrack(track);
			await interaction.reply({
				embeds: [
					new EmbedBuilder()
						.setTitle(`**💿 │** ${track.title}`)
						.setDescription(
							`**🎤 │** ${track.author}\n\n**🕗 │** ${track.duration}\n\nThe audio track has been added to the queue.`,
						)
						.setURL(track.url)
						.setThumbnail(track.thumbnail)
						.setFooter({ text: `${client.user.username}` }),
				],
				ephemeral: true,
			});
		} else if (interaction.options.getSubcommand() === 'playlist') {
			const query = interaction.options.getString('playlist', true);
			const result = await client.player.search(query, {
				requestedBy: interaction.user,
				searchEngine: QueryType.AUTO,
			});

			if (result.tracks.length === 0 || !result.playlist) {
				await interaction.reply({
					embeds: [
						new EmbedBuilder()
							.setTitle('**💿 │** Audio playlist not found')
							.setDescription('There is no audio playlist found.')
							.setFooter({ text: `${client.user.username}` }),
					],
					ephemeral: true,
				});
			}

			const { playlist } = result;

			await queue.addTracks(result.tracks);
			await interaction.reply({
				embeds: [
					new EmbedBuilder()
						.setTitle(`**💿 │** ${playlist.title}`)
						.setDescription(
							`**🎤 │** ${playlist.author.name}\n\nThe \`${playlist.tracks.length}\` audio tracks from the playlist have been added to the queue.`,
						)
						.setURL(playlist.url)
						.setThumbnail(playlist.thumbnail)
						.setFooter({ text: `${client.user.username}` }),
				],
				ephemeral: true,
			});
		}

		if (!queue.connection) {
			await queue.connect(member.voice.channel);
		}
		if (!queue.playing) {
			await queue.play();
			queue.setVolume(25);
		}
	},
};
