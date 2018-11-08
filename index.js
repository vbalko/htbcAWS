//const express = require('./services/express');
const logger = require('./services/winston');

const ctrl = require('./controller');
//const expressPort = require('./config').port;
//const tradeUtil = require('./api/controller/trade/utils');

//init dynamo tables
ctrl.initTables();

//const app = express(api,__dirname);

//app.listen(expressPort);
//logger.info('Listening on port ',expressPort);
//ctrl.utils.refreshTickers2();
//setInterval(() => ctrl.utils.refreshTickers2(),1*60*1000);


//every 30 min pass 1m tickers to 5m average tickers
//tradeUtil.passTo5min().then(() => logger.info('Finished processing...'));
//setInterval(() => tradeUtil.passTo5min().then(()=>logger.info('Finished processing...')),30*60*1000);
//tradeUtil.pt(0).then(() => console.log('Finished processing...'));

