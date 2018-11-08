/*
	Data for Ticker tickers
*/
const logger = require('../../services/winston');

const _params = {
	TableName: 'ticker1m',
	KeySchema: [
		{ AttributeName: 'symbol', KeyType: 'HASH' },
		{ AttributeName: 'timestamp', KeyType: 'RANGE' }
	],
	AttributeDefinitions: [
		{ AttributeName: 'symbol', AttributeType: 'S' },
		{ AttributeName: 'timestamp', AttributeType: 'S' }
		//		{ AttributeName: 'lastTickerTimestamp', AttributeType: 'N' }
	],
	ProvisionedThroughput: {
		ReadCapacityUnits: 10,
		WriteCapacityUnits: 10
	}
};

class ticker1mClass {
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
				timestamp: obj.timestamp,
				ask: obj.ask,
				bid: obj.bid,
				last: obj.last,
				open: obj.open,
				low: obj.low,
				high: obj.high,
				volume: obj.volume,
				volumeQuote: obj.volumeQuote
			}
		};

		try {
			const data = await this.docClient.put(params).promise();
			logger.debug('Added item:', JSON.stringify(data, null, 2));
		} catch (err) {
			logger.error(
				'Error in ticker1m.put. Error JSON:',
				JSON.stringify(err, null, 2)
			);
		}
	}
}

ticker1mClass.tableName = _params.TableName;
ticker1mClass.params = _params;

module.exports = ticker1mClass;
