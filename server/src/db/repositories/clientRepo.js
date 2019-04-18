const db = require('../baseDb');
const clients = db.clients;

class ClientRepo {
	constructor() {}

	async list() {
		return await clients.findAsync({});
	}

	async findById(id) {
		return await clients.findOneAsync({ _id: id });
	}

	async findByName(name) {
		return await clients.findOneAsync({ name });
	}

	async insert(client) {
		return await clients.insertAsync(client);
	}

	async update(id, client) {
		const results = await clients.updateAsync({ _id: id }, client, {
			returnUpdatedDocs: true,
			multi: false
		});
		return results[1];
	}

	async delete(id) {
		return await db.clients.removeAsync({ _id: id }, {});
	}
}

module.exports = ClientRepo;
