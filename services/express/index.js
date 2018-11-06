const express = require('express');


module.exports = (routes,dir) => {
	const app = express();
	app.use(routes);
	app.use(express.static(dir));

	return app;
};