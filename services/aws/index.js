const AWS = require('./awsSdk');
const dbUtils = require('./dynamoUtils');
//const models = require('../../models');



//dbUtils.setAWSConfig(dynamoConf);


//exports.dynamoDB = dynamoDB;
exports.dbUtils = dbUtils;
exports.aws = AWS;
