require('dotenv').config();
const express = require('express');
const http = require('http');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// need to find a better way
global.appRoot = __dirname;

var jsPath = path.resolve(__dirname, './js');
var appPath = path.resolve(__dirname, './app');
// var nmPath = path.resolve(__dirname, '../node_modules');

const routes = require('./routes');
const api = require('./api');

let app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', routes);
app.use('/api', api);
// app.use('/js', express.static(jsPath));
// app.use('/app', express.static(appPath));
// app.use('/node_modules', express.static(nmPath));

const PORT = process.env.PORT || 5000;

let server = http.createServer(app);
server.listen(PORT, function() {
	console.log('Server started listening...');
});
