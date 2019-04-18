require('dotenv').config();
const express = require('express');
const http = require('http');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const chalk = require('chalk');

const api = require('./api');

let app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', api);

process.once('SIGHUP', () => {
	console.log(chalk.red('Shutting down...'));
	server.close();
	process.kill(process.pid, 'SIGHUP');
});

const PORT = process.env.PORT || 5000;

let server = http.createServer(app);
server.listen(PORT, function() {
	console.log(`Server started listening on: ${PORT}`);
});
