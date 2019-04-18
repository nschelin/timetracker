// collections and keys to create db files used by nedb.
const dbs = ['clients', 'projects'];

// Use bluebird to create promises on db functions; had issues with util.promisify (may revisit this...)
//const { promisify } = require('util');

const Promise = require('bluebird');
const DataStore = require('nedb');

// DataStore.prototype.findAsync = Promise.promisify(DataStore.prototype.find);
DataStore.prototype.findOneAsync = Promise.promisify(
	DataStore.prototype.findOne
);
DataStore.prototype.insertAsync = Promise.promisify(DataStore.prototype.insert);
DataStore.prototype.updateAsync = Promise.promisify(
	DataStore.prototype.update,
	{ multiArgs: true }
);
DataStore.prototype.removeAsync = Promise.promisify(
	DataStore.prototype.remove,
	{ multiArgs: true }
);

const db = {};
// create collections
dbs.forEach(dbKey => {
	db[dbKey] = new DataStore({
		filename: `${__dirname}/data/${dbKey}.db`,
		autoload: true
	});
});

module.exports = db;
