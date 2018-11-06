/*
	Data for Ticker Headers
*/
//const {dynamoDB, dbUtils} = require('../../services/aws');
const methods = require('./methods');
const logger = require('../../services/winston');

const _params = {
	TableName: 'tickerHeader',
	KeySchema: [{ AttributeName: 'symbol', KeyType: 'HASH' }],
	AttributeDefinitions: [
		{ AttributeName: 'symbol', AttributeType: 'S' },
//		{ AttributeName: 'symbolExt', AttributeType: 'N' },
//		{ AttributeName: 'lastTickerTimestamp', AttributeType: 'N' }
	],
	ProvisionedThroughput: {
		ReadCapacityUnits: 10,
		WriteCapacityUnits: 10
	}
};

const tickerHeader = {
	tableName: _params.TableName,
	params: _params
};

class tickerHeaderClass {
	constructor(AWS) {
		this.dynamoDB = new AWS.DynamoDB();
		this.docClient = new AWS.DynamoDB.DocumentClient();
		this.tableName = _params.TableName;
	}
	async put(obj) {
		const params = {
			TableName: this.tableName,
			Item: {
				symbol: obj.symbol,
				symbolExt: obj.symbolExt,
				lastTickerTimestamp: obj.lastTickerTimestamp
			}
		};

		try {
			const data = await this.docClient.put(params).promise();
			logger.debug('Added item:', JSON.stringify(data, null, 2));
		} catch (err) {
			logger.error(
				'Error in tickerHeader.put. Error JSON:',
				JSON.stringify(err, null, 2)
			);
		}
	}
}

tickerHeaderClass.tableName = _params.TableName;
tickerHeaderClass.params = _params;

module.exports = tickerHeaderClass;
