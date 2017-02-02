'use strict';
const 	mongoose = require('mongoose'),
		Schema = mongoose.Schema,
		ObjectId = Schema.ObjectId;

var ResourceSchema = new Schema({
	id: ObjectId,
	firstName: String,
	lastName: String,
	created: { type: Date, default: Date.now },
	modified: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Resource', ResourceSchema);
