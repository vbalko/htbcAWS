const path = require('path');

const requireProcessEnv = (name) => {
	if (!process.env[name]) {
		throw new Error('You must set the ' + name + ' enviroment variable');
	}
	return process.env[name];
};

if (process.env.NODE_ENV !== 'production') {
	const dotenv = require('dotenv-safe');
	dotenv.load({
		path: path.join(__dirname, '.env'),
		sample: path.join(__dirname, '.env.example')
	});
}

const config = {
	all: {
		env: process.env.NODE_ENV || 'development',
		port: process.env.PORT || 4000,
		apiRoot: process.env.apiRoot || '/',
		logDir: 'log',
		masterKey: requireProcessEnv('MASTER_KEY'),
		db: 'dynamoDB', //or mongoDB
		dynamoDB: {
			uri: requireProcessEnv('DYNAMODB_URI'),
			region: requireProcessEnv('DYNAMODB_REGION'),

		},
	},
	development: {

	}
};

module.exports = Object.assign(config.all, config[config.all.env]);