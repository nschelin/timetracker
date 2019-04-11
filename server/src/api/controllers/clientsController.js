const db = require('../../db');

exports.list = async (req, res) => {
	const clients = await db.clients.findAsync({});
	res.send(clients);
};

exports.add = async (req, res) => {
	const client = req.body;
	const foundClient = await db.clients.findOneAsync({ name: client.name });
	if (!foundClient) {
		const newClient = await db.clients.insertAsync(client);
		res.send(newClient);
	} else {
		res.sendStatus(400).send('Client Already Exists');
	}
};

exports.update = async (req, res) => {
	const id = req.params.id;
	const client = req.body;

	try {
		const updatedClient = await db.clients.updateAsync({ _id: id }, client, {
			returnUpdatedDocs: true,
			multi: false
		});
		res.send(updatedClient);
	} catch (e) {
		res.sendStatus(500).send(e);
	}
};

exports.delete = async (req, res) => {
	const id = req.params.id;
	try {
		const numRemoved = await db.clients.removeAsync({ _id: id }, {});
		res.send(numRemoved);
	} catch (e) {
		res.sendStatus(400).send('Bad Request');
	}
};
