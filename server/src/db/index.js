//const { promisify } = require('util');
// //const { promisify } = require('util');
const Promise = require('bluebird');
const DataStore = require('nedb');

DataStore.prototype.findAsync = Promise.promisify(DataStore.prototype.find);
DataStore.prototype.findOneAsync = Promise.promisify(
	DataStore.prototype.findOne
);
DataStore.prototype.insertAsync = Promise.promisify(DataStore.prototype.insert);
DataStore.prototype.updateAsync = Promise.promisify(
	DataStore.prototype.update,
	{ multiArgs: true }
);

// DataStore.prototype.findAsync = promisify(DataStore.prototype.find);
// DataStore.prototype.findOneAsync = promisify(DataStore.prototype.findOne);
// DataStore.prototype.insertAsync = promisify(DataStore.prototype.insert);
// DataStore.prototype.updateAsync = promisify(
// 	(query, update, options) =>
// 		new Promise((resolve, reject) => {
// 			DataStore.prototype._update(
// 				query,
// 				update,
// 				options,
// 				(err, numAffected, docs, upsert) => {
// 					console.log('update callback');
// 					if (err) {
// 						return reject(err);
// 					} else {
// 						return resolve({ numAffected, docs, upsert });
// 					}
// 				}
// 			);
// 		})
// );

//DataStore.prototype.updateAsync = promisify(DataStore.prototype.update);
//const db = new DataStore({ filename: 'timetracker.db', autoload: true })
const db = {};
db.clients = new DataStore({ filename: 'clients.db', autoload: true });

module.exports = db;
