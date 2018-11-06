const { dynamoDB, dbUtils } = require('../../services/aws');
const logger = require('../../services/winston');

exports.createTable = async (params) => {
	return dbUtils.createTable(params,true);
};

const methods = {
	put: (params) => {
		
	}
};

module.exports = methods;