const winston = require('winston');
const wdrf = require('winston-daily-rotate-file');
const fs = require('fs');
const env = require('../../config').env;
const logDir = require('../../config').logDir;

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
	fs.mkdirSync(logDir);
}

const tsFormat = () => new Date().toLocaleTimeString();

const logger = winston.createLogger({
	transports: [
		//colorize output to the console
		new winston.transports.Console({
			timestamp: tsFormat,
			colorize: true,
			level: 'debug'
		}),
		new wdrf({
			filename: `${logDir}/-results.log`,
			timestamp: tsFormat,
			datePattern: 'yyyy-MM-dd',
			prepend: true,
			level: env === 'development' ? 'debug' : 'info'
		})
	]
});

module.exports = logger;
