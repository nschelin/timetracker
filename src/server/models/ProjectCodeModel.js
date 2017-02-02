'use strict';
const 	mongoose = require('mongoose'),
		Schema = mongoose.Schema,
		ObjectId = Schema.ObjectId;

var ProjectCodeSchema = new Schema({
	id: ObjectId,
	code: String,
	company: { type: ObjectId, ref: 'Company' },
	created: { type: Date, default: Date.now },
	modified: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ProjectCode', ProjectCodeSchema)
