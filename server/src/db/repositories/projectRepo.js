const db = require('../baseDb');
const projects = db.projects;

class ProjectRepo {
	constructor() {}

	async list(page = 1, pageSize = 5) {
		if (page < 1) page = 0;

		return await new Promise((resolve, reject) => {
			projects
				.find({})
				.sort({ name: 1 })
				.skip((page - 1) * pageSize)
				.limit(pageSize)
				.exec((err, projects) => {
					if (err) reject(err);

					resolve(projects);
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
		return await db.projects.removeAsync({ _id: id }, {});
	}
}

module.exports = ProjectRepo;
