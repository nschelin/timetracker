'use strict';
const path = require('path');
const router = require('express').Router();

router.get('/', function(req, res) {
	var pagePath = global.appRoot + '/index.html';
	//res.end(pagePath);
	let page = path.resolve(pagePath);
	res.sendFile(page);
});

module.exports = router;
