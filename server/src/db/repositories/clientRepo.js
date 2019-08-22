const db = require('../baseDb');
const clients = db.clients;
const projects = db.projects;

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
				.exec((err, clientDocs) => {
					if (err) reject(err);

					const clientIds = clientDocs.map(({ _id }) => ({
						clientId: _id
					}));

					projects.find({ $or: clientIds }, (err, projectDocs) => {
						if (err) reject(err);

						projectDocs.forEach((p, index, arr) => {
							const clientIndex = clientDocs.findIndex(
								c => c._id === p.clientId
							);

							clientDocs[clientIndex].canDelete =
								clientIndex > -1 ? false : true;
						});

						const collection = {
							items: clientDocs,
							page,
							total
						};
						resolve(collection);
					});
				});
		});
	}

	async allClients() {
		return new Promise((resolve, reject) => {
			clients.find({}, (err, allClients) => {
				if (err) reject(err);

				allClients.sort((a, b) => a.name > b.name);
				resolve(allClients);
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
