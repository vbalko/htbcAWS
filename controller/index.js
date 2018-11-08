const logger = require('../services/winston');
const aws = require('../services/aws');
//const dbUtils = require('../services/aws').dbUtils;
const models = require('../models');
const htbc = require('../services/exchanges/hitbtc');

//const tickerHeaderModel = models.tables[]

const ctrl = {
	processOneTicker: async ticker => {
		//look if record with actual symbol is in db
		try {
			const tickerHeaderDb = await model.t2hModel.findOne({
				symbol: ticker.symbol
			});
			if (tickerHeaderDb) {
				// check timestamp if update is necessary.
				if (
					new Date(tickerHeaderDb.lastTickerTimestamp) <
					new Date(ticker.timestamp)
				) {
					//update timestamp on header
					const oUpdateRes = await model.t2hModel.updateOne(
						{ symbol: ticker.symbol },
						{ lastTickerTimestamp: ticker.timestamp }
					);
					// if (oUpdateRes) {
					// }
					//create new record in t2
					const fromDBCr = await model.t2Model.create(
						util.convertToT2Data(await ticker)
					);
					// if (fromDBCr) {
					// }
				}
			} else {
				logger.info(
					`err: neexistuje v db ${ticker.symbolExt} Vytvarim novy zaznam.`
				);
				//if it does not exist create one
				const fromDBCr = await model.t2hModel.create(
					util.convertToDBT2H(await ticker)
				);
				// if (fromDBCr) {
				// }
				const fromDBCrData = await model.t2Model.create(
					util.convertToT2Data(await ticker)
				);
			}
		} catch (err) {
			logger.error(
				`err: Chyba vytvoreni zaznamu v db ${ticker.symbolExt} ${err}`
			);
		}
	},
	//DB UTILS
	initTables: async () => {
		return await aws.dbUtils.initTables(models.tables);
	}
};

module.exports = ctrl;
