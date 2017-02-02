'use strict';
const 	mongoose = require('mongoose'),
		Schema = mongoose.Schema,
		ObjectId = Schema.ObjectId;

var CompanySchema = new Schema({
	id: ObjectId,
	companyName: String,
	company: { type: ObjectId, ref: 'Company' },
	created: { type: Date, default: Date.now },
	modified: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Company', CompanySchema);
