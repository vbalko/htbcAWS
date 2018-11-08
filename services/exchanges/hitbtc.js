// const d3 = require('d3-fetch');
const req = require('request-promise');
const logger = require('../winston');
//const tickersUtils = require('../../api/tickers/utils');
//const ticker2Utils = require('../../api/tickers2/utils');


class HitBTC {
	constructor() {
		// if (typeof fetch !== 'function') {
		// 	global.fetch = require('node-fetch-polyfill');
		// }
		this.apiURL = 'https://api.hitbtc.com/api/2/public/';
	}

	async get(action) {
		//let dataJSON = JSON.stringify(data);
		try {
			//const response = await d3.json('https://api.hitbtc.com/api/2/public/'+action);
			const options = {
				uri: 'https://api.hitbtc.com/api/2/public/' + action,
				json: true
			};
			const response = await req(options);
			return await response;
		} catch (err) {
			const problem = 'Nepovedlo se nacist public/' + action + ' ';
			//eslint-disable-next-line no-console
			logger.error('problem: ', problem + err);
			return { problem: problem + err };
		}		
	}

	async processTickers(version) {
		try {
			const tickers = await this.get('ticker');
			const aSymbols = await tickers.
				filter((item) => item.symbol.includes('ETH')).
				map((item) => {
					item.symbolExt = item.symbol.indexOf('ETH') == 0 ? item.symbol.replace('ETH', 'ETH/') : item.symbol.replace('ETH', '/ETH');
					return item;
				});
			if (version == 1) {
//				tickersUtils.processTickers(aSymbols);
			} else {
//				ticker2Utils.processTickers(aSymbols);
			}
			return await aSymbols;
		} catch (err) {
			const problem = 'Problem: hitbtc.js processTickers ' + err;
			//eslint-disable-next-line no-console
			logger.error('problem: ', problem);
			return { 'problem': problem };
		}		
	}
	async getTickers() {
		try {
			const tickers = await this.get('ticker');
			const aSymbols = await tickers.
				filter((item) => item.symbol.includes('ETH')).
				map((item) => {
					item.symbolExt = item.symbol.indexOf('ETH') == 0 ? item.symbol.replace('ETH', 'ETH/') : item.symbol.replace('ETH', '/ETH');
					return item;
				});
			return await aSymbols;			
		} catch (err) {
			const problem = 'Problem: hitbtc.js getTickers '+err;
			logger.error('problem: ', problem);
			return { 'problem': problem };
		}
		
	}

	async tst() {
		const tickers = await this.getTickers();
//		tickersUtils.processTickers(tickers);
		return await tickers;
	}
}

module.exports = HitBTC;