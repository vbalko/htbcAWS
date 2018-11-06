
const dbUtils = require('./dynamoUtils');
const models = require('../../models');

//const dynamoConf = conf.dynamoDB;

//set AWS API parameters
//dbUtils.setAWSConfig(dynamoConf);

//init db tables
dbUtils.initTables(models.tables);

//exports.dynamoDB = dynamoDB;
exports.dbUtils = dbUtils;
//module.exports = AWS;
