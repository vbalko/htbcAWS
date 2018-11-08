const AWS = require('aws-sdk');
const conf = require('../../config').dynamoDB;

//set AWS API parameters
AWS.config.update({
	region: conf.region,
	endpoint: conf.uri
});

module.exports = AWS;
