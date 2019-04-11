const db = require('../../db');

// const clientFind = util.promisify(db.clients['find']);
// console.log(db.clients);

exports.list = async (req, res) => {
	// try {
	// 	const clients = await clientFind();
	// 	res.send(clients);
	// } catch (e) {
	// 	res.send({ message: 'error', error: e });
	// }

	const clients = await db.clients.findAsync({});
	res.send(clients);
	// db.clients.find({}, (err, clients) => {
	// 	if (err) throw err;

	// 	res.send(clients);
	// });
};

exports.add = async (req, res) => {
	const client = req.body;
	const foundClinet = await db.clients.findOneAsync({ name: client.name });
	if (!foundClinet) {
		const newClient = await db.clients.insertAsync(client);
		res.send(newClient);
	} else {
		res.status(400).send('Client Already Exists');
	}

	// db.clients.findOne({ name: client.name }, (err, foundClient) => {
	// 	if (err) throw err;

	// 	if (!foundClient) {
	// 		db.clients.insert(client, (err, newClient) => {
	// 			res.send(newClient);
	// 		});
	// 	} else {
	// 		res.status(400).send('Client Already Exists');
	// 	}
	// });
};

exports.update = (req, res) => {
	const id = req.params.id;
	const client = req.body;

	db.clients.update(
		{ _id: id },
		client,
		{ returnUpdatedDocs: true, multi: false },
		function(err, numAffected, updateClient) {
			if (err) throw err;
			res.send(updateClient);
		}
	);
};
