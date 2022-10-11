import * as winston from 'winston';

import { botConfig } from '../config';

const { transports, format } = winston;

export const logger = winston.createLogger({
	format: format.combine(
		format.timestamp({ format: 'MM/DD/YYYY, h:mm:ss A' }),
		format.colorize(),
		format.printf((info) => `[DeeJ] ${info.level}	${info.timestamp} ${info.message}`),
	),
	transports: [
		new transports.Console({
			level: 'debug',
		}),
		new transports.File({
			level: 'info',
			filename: `${botConfig.logs.combinedPath}`,
			format: format.combine(format.timestamp(), format.uncolorize()),
		}),
		new transports.File({
			level: 'error',
			filename: `${botConfig.logs.errorPath}`,
			format: format.combine(format.timestamp(), format.uncolorize()),
		}),
	],
});
