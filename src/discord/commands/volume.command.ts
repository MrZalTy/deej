import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js';

export = {
	data: new SlashCommandBuilder()
		.setName('volume')
		.setDescription('Set the volume of the player.')
		.addNumberOption((option) =>
			option.setName('level').setDescription('Volume level').setMinValue(0).setMaxValue(100),
		),
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
							.setFooter({ text: `${client.user.username}` }),
					],
					ephemeral: true,
				});
				return;
			}

			const value = interaction.options.getNumber('level');

			if (value) {
				queue.setVolume(value);
				await interaction.reply({
					embeds: [
						new EmbedBuilder()
							.setTitle('**🔊 │** Volume updated')
							.setDescription(`The volume has been updated to \`${value}\`%.`)
							.setFooter({ text: `${client.user.username}` }),
					],
					ephemeral: true,
				});
			} else {
				await interaction.reply({
					embeds: [
						new EmbedBuilder()
							.setTitle('**🔊 │** Volume')
							.setDescription(`The volume is set to \`${queue.volume}\`%.`)
							.setFooter({ text: `${client.user.username}` }),
					],
					ephemeral: true,
				});
			}
		} catch (err) {
			await interaction.reply({
				embeds: [
					new EmbedBuilder()
						.setTitle('**❌ │** Internal server error')
						.setDescription('An error occurred when trying to execute this command.')
						.setFooter({ text: `${client.user.username}` }),
				],
				ephemeral: true,
			});
			throw err;
		}
	},
};
