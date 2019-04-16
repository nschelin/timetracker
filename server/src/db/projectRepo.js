const db = require('./baseDb');
const projects = db.projects;

class ProjectRepo {
	constructor() {}

	async list() {
		return await projects.findAsync({});
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
		project.modified = new Date();
		return await projects.updateAsync({ _id: id }, project, {
			returnUpdatedDocs: true,
			multi: false
		});
	}

	async delete(id) {
		return await db.projects.removeAsync({ _id: id }, {});
	}
}

module.exports = ProjectRepo;
