const db = require('../baseDb');
const timecards = db.timecards;
const projects = db.projects;
const clients = db.clients;

class TimeCardRepo {
	constructor() {}

	async list(page = 1, pageSize = 5) {
		if (page < 1) page = 0;
		const total = await this.total();

		return await new Promise((resolve, reject) => {
			timecards
				.find({})
				.sort({ name: 1 })
				.skip((page - 1) * pageSize)
				.limit(pageSize)
				.exec((err, timeCardDocs) => {
					if (err) reject(err);

					const collection = {
						items: timeCardDocs,
						page,
						total
					};

					resolve(collection);
				});
		});
	}

	async total() {
		return await new Promise((resolve, reject) => {
			timecards.count({}, function(err, count) {
				if (err) reject(err);

				resolve(count);
			});
		});
	}

	async findById(id) {
		return await timecards.findOneAsync({ _id: id });
	}

	async findByYearWeek(year, week) {
		return await timecards.findOneAsync({
			$and: [{ 'week.year': +year }, { 'week.weekNumber': +week }]
		});
	}

	async createTimeCard(week, year) {
		return await timecards.createTimeCardAsync(week, year);
	}
	async insert(project) {
		return await timecards.insertAsync(project);
	}

	async update(id, project) {
		const results = await timecards.updateAsync({ _id: id }, project, {
			returnUpdatedDocs: true,
			multi: false
		});
		return results[1];
	}

	async delete(id) {
		return await timecards.removeAsync({ _id: id }, {});
	}
}

module.exports = TimeCardRepo;
