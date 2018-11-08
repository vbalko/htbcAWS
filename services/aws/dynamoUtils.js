const AWS = require('./awsSdk');
const logger = require('../winston');


//create dynamodb object
const db = new AWS.DynamoDB();

const utils = {
	dynamodb: db,
	setAWSConfig: config => {
		AWS.config.update({
			region: config.region,
			endpoint: config.uri
		});
	},
	//function to init all db tables
	initTables: async aTables => {
		aTables.forEach(async table => {
			try {
				let exists = await utils.tableExists(table.tableName);
				if (!exists) {
					let ret = await utils.createTable(table.params, false); //dont check for table existence - we done that before
					if (!ret) {
						logger.error(
							`Error in dynamoUtils.initTables. Error creating table: ${table.tableName}`
						);
					}
				} else {
					logger.debug(`initTables: Table ${table.tableName} already existing.`);
				}

			} catch (err) {
				logger.error(
					`Error in dynamoUtils.initTables. | ${err.code} | ${err.message}`
				);
			}
		});
		logger.debug('initTables: Initialized succesfully');
	},
	tableExists: async tableName => {
		let ret = {};
		try {
			ret = await utils.dynamodb
				.describeTable({ TableName: tableName })
				.promise();
			//console.log("Created table. Table description JSON:", JSON.stringify(ret, null, 2));
		} catch (err) {
			if (err.code == 'ResourceNotFoundException') {
				return false;
			}
			logger.error(
				`Error in dynamoUtils.tableExists. | ${err.code} | ${err.message}`
			);
		}
		return ret.Table.TableStatus == 'ACTIVE' ? true : false;
	},
	createTable: async (params, checkExists = true) => {
		//if existency check is required...
		//proceed only if ! tableExists
		const proceed = checkExists
			? !(await utils.tableExists(params.TableName))
			: true;
		//dont continue if create is not possible
		if (!proceed) return false;

		let ret = {};
		try {
			ret = await utils.dynamodb.createTable(params).promise();
			logger.debug(`Created table: ${params.TableName}`);
		} catch (err) {
			logger.error(
				`Error in dynamoUtils.createTable. | ${err.code} | ${err.message}`,
				
			);
			return false;
		}
		logger.debug(
			'Created table.Table description JSON:',
			JSON.stringify(ret, null, 2)
		);
		return true;
	}
};

module.exports = utils;
