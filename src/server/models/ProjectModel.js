'use strict';
const 	mongoose = require('mongoose'),
		Schema = mongoose.Schema,
		ObjectId = Schema.ObjectId;

var ProjectSchema = new Schema({
	id: ObjectId,
	date: Date,
	notes: String,
	projectCode: { type: ObjectId, ref: 'ProjectCode' },
	resource: { type: ObjectId, ref: 'Resource' },
	created: { type: Date, default: Date.now },
	modified: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', ProjectSchema);
