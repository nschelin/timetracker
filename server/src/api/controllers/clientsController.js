const { ClientRepo } = require('../../db');
const db = new ClientRepo();

exports.list = async (req, res) => {
	const page = req.query.page || 1;
	const pageSize = req.query.pageSize || 5;
	const clients = await db.list(+page, +pageSize);
	res.send(clients);
};

exports.all = async (req, res) => {
	const clients = await db.allClients();
	res.send(clients);
};

exports.add = async (req, res) => {
	const client = req.body;
	const foundClient = await db.findByName(client.name);
	if (!foundClient) {
		client.created = client.modified = new Date();
		const newClient = await db.insert(client);
		res.send(newClient);
	} else {
		res.status(400).send('Client Already Exists');
	}
};

exports.update = async (req, res) => {
	const id = req.params.id;
	const client = req.body;
	client.modified = new Date();
	try {
		const updatedClient = await db.update(id, client);
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
