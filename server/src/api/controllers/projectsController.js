const { ProjectRepo, ClientRepo } = require('../../db');
const db = new ProjectRepo();

exports.list = async (req, res) => {
	const projects = await db.list();
	res.send(projects);
};

exports.add = async (req, res) => {
	const project = req.body;
	const foundProject = await db.findByName(project.name);
	if (!foundProject) {
		const newProject = await db.insert(project);
		res.send(newProject);
	} else {
		res.sendStatus(400).send('Project Already Exists');
	}
};

exports.update = async (req, res) => {
	const id = req.params.id;
	const project = req.body;
	try {
		const updatedProject = await db.update(id, project);
		res.send(updatedProject);
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
