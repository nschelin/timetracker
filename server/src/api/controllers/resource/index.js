'use strict';

const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Resource = require(global.appRoot + '/models/ResourceModel');

var api = {
	list: function(req, res) {
		res.json({ count: 0 });
	},
	new: function(req, res) {
		res.json(req.body);
	},
	detail: function(req, res) {
		res.json({ count: 0 });
	},
	update: function(req, res) {
		res.json({ count: 0 });
	}
}

module.exports = api;