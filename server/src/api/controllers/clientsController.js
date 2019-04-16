const { ClientRepo } = require('../../db');
const db = new ClientRepo();

exports.list = async (req, res) => {
	const clients = await db.list();
	res.send(clients);
};

exports.add = async (req, res) => {
	const client = req.body;
	const foundClient = await db.findByName(client.name);
	if (!foundClient) {
		const newClient = await db.insert(client);
		res.send(newClient);
	} else {
		res.sendStatus(400).send('Client Already Exists');
	}
};

exports.update = async (req, res) => {
	const id = req.params.id;
	const client = req.body;
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
