const util = require('util');
const DataStore = require('nedb');
DataStore.prototype.findAsync = util.promisify(DataStore.prototype.find);
DataStore.prototype.findOneAsync = util.promisify(DataStore.prototype.findOne);
DataStore.prototype.insertAsync = util.promisify(DataStore.prototype.insert);
//const db = new DataStore({ filename: 'timetracker.db', autoload: true })
const db = {};
db.clients = new DataStore({ filename: 'clients.db', autoload: true });

module.exports = db;
