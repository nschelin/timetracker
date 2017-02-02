'use strict';

const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Project = require(global.appRoot + '/models/ProjectModel');

var api = {
	list: function(req, res) {
		res.json({ count: 0 });
	},
	new: function(req, res) {
		res.json({ count: 0 });
	},
	detail: function(req, res) {
		res.json({ count: 0 });
	},
	update: function(req, res) {
		res.json({ count: 0 });
	}
}

module.exports = api;