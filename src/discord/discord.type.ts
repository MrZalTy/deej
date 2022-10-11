import { Collection, SlashCommandBuilder } from 'discord.js';

declare module 'discord.js' {
	export interface Client {
		commands: Collection<string, Command>;
	}
}

export interface Command {
	data: SlashCommandBuilder;
	execute: (...args) => void;
}

export interface Event {
	name: string;
	once: boolean;
	execute: (...args) => void;
}
