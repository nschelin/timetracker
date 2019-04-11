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
		console.log(`updatedClient: ${updatedClient}`);
		res.send(updatedClient);
	} catch (e) {
		console.log(e);
		res.sendStatus(500).send(e);
	}
};
