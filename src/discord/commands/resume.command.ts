import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js';

export = {
	data: new SlashCommandBuilder().setName('resume').setDescription('Resume the player.'),
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
							.setFooter({ text: `${client.user?.username}` }),
					],
					ephemeral: true,
				});
				return;
			}

			queue.setPaused(false);
			await interaction.reply({
				embeds: [
					new EmbedBuilder()
						.setTitle(`**▶ ️│** Player resumed`)
						.setDescription('The player has been resumed.\n\nUse `/pause` to pause the player.')
						.setFooter({ text: `${client.user.username}` }),
				],
				ephemeral: true,
			});
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
