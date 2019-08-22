const db = require('../baseDb');
const projects = db.projects;
const clients = db.clients;

class ProjectRepo {
	constructor() {}

	async list(page = 1, pageSize = 5) {
		if (page < 1) page = 0;
		const total = await this.total();

		return await new Promise((resolve, reject) => {
			projects
				.find({})
				.sort({ name: 1 })
				.skip((page - 1) * pageSize)
				.limit(pageSize)
				.exec((err, projectDocs) => {
					if (err) reject(err);

					const clientIds = projectDocs.map(({ clientId }) => ({
						_id: clientId
					}));

					clients.find({ $or: clientIds }, (err, clientDocs) => {
						if (err) reject(err);

						projectDocs.forEach((p, index, arr) => {
							const client = clientDocs.find(c => c._id === p.clientId);
							arr[index].client = client;
						});

						const collection = {
							items: projectDocs,
							page,
							total
						};

						resolve(collection);
					});
				});
		});
	}

	async total() {
		return await new Promise((resolve, reject) => {
			projects.count({}, function(err, count) {
				if (err) reject(err);

				resolve(count);
			});
		});
	}

	async findById(id) {
		return await projects.findOneAsync({ _id: id });
	}

	async findByName(name) {
		return await projects.findOneAsync({ name });
	}

	async insert(project) {
		return await projects.insertAsync(project);
	}

	async update(id, project) {
		const results = await projects.updateAsync({ _id: id }, project, {
			returnUpdatedDocs: true,
			multi: false
		});
		return results[1];
	}

	async delete(id) {
		return await projects.removeAsync({ _id: id }, {});
	}
}

module.exports = ProjectRepo;
