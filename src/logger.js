import winston from 'winston';
import _ from 'lodash';

export default winston.createLogger({
	format: winston.format.combine(
		winston.format.splat(),
		winston.format.metadata(),
		winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss.SSS'}),
		winston.format(info => {
			info.level = info.level.toUpperCase();
			info.level = _.padEnd(info.level, 7, ' ');
			return info;
		})(),
		winston.format.colorize(),
		winston.format.printf(info => {
			let template = _.template('[${timestamp}] --- ${level} : ${message}');
			return template(info);
		})
	),
	transports: [
		new winston.transports.Console(),
		new winston.transports.File({
			filename: '.log',
			maxsize: 10 * 1024 * 1024,
			maxFiles: 1
		})
	]
});
