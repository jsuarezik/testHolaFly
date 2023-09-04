const express = require('express');
const applyEndpoints = require('./endpoints');
const applyMiddlewares = require('./middlewares');

const createExpressServer = async app => {
	const server = express();
	applyMiddlewares(server, app);
	applyEndpoints(server, app);
    
    await app.db.initDB();

	return server;
};

module.exports = createExpressServer;