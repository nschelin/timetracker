const clients = require('../baseDb').clients;

class ClientRepo {
	constructor() {}

	async list(page = 1, pageSize = 5) {
		if (page < 1) page = 0;
		const total = await this.total();
		return await new Promise((resolve, reject) => {
			clients
				.find({})
				.sort({ name: 1 })
				.skip((page - 1) * pageSize)
				.limit(pageSize)
				.exec((err, clients) => {
					if (err) reject(err);

					const collection = {
						items: clients,
						page,
						total
					};
					resolve(collection);
				});
		});
	}

	async total() {
		return await new Promise((resolve, reject) => {
			clients.count({}, function(err, count) {
				if (err) reject(err);

				resolve(count);
			});
		});
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
		return await clients.removeAsync({ _id: id }, {});
	}
}

module.exports = ClientRepo;
