const { TimeCardRepo } = require('../../db');
const db = new TimeCardRepo();

exports.list = async (req, res) => {
	const page = req.query.page || 1;
	const pageSize = req.query.pageSize || 5;
	const timecards = await db.list(+page, +pageSize);
	res.send(timecards);
};

exports.get = async (req, res) => {
	const id = req.params.id;
	const timecard = (await db.findById(id)) || null;
	res.send(timecard);
};

exports.getYearWeek = async (req, res) => {
	const week = req.params.week;
	const year = req.params.year;
	const timecard = (await db.findByYearWeek(year, week)) || null;
	res.send(timecard);
};

exports.add = async (req, res) => {
	const timeCard = req.body;
	const foundTimeCard = await db.findByName(timeCard.name);
	if (!foundTimeCard) {
		timeCard.created = timeCard.modified = new Date();
		const newTimeCard = await db.insert(timeCard);
		res.send(newTimeCard);
	} else {
		res.status(400).send('Time Card Already Exists');
	}
};

exports.update = async (req, res) => {
	const id = req.params.id;
	const timeCard = req.body;
	timeCard.modified = new Date();
	try {
		const updatedTimeCard = await db.update(id, timeCard);
		res.send(updatedClient);
	} catch (e) {
		res.sendStatus(500).send(e);
	}
};

exports.delete = async (req, res) => {
	const id = req.params.id;
	try {
		const numRemoved = await db.delete(id);
		res.send(numRemoved);
	} catch (e) {
		res.sendStatus(400).send('Bad Request');
	}
};
