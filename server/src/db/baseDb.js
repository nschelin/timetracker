const dbs = ['clients', 'projects'];

const clientDbFile = `${__dirname}/clients.db`;
const projectsDbFile = `${__dirname}/projects.db`;
//const { promisify } = require('util');
// Use bluebird to create promises on db function; had issues with util.promisify (may revisit this...)

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

DataStore.prototype.removeAsync = Promise.promisify(
	DataStore.prototype.remove,
	{ multiArgs: true }
);

const db = {};
// create collections
dbs.forEach(dbKey => {
	db[dbKey] = new DataStore({
		filename: `${__dirname}/${dbKey}.db`,
		autoload: true
	});
});

module.exports = db;
