'use strict';
const router = require('express').Router();

const clientsController = require('./controllers/clientsController');
const projectsController = require('./controllers/projectsController');
const timeCardController = require('./controllers/timecardsController');

router.get('/', function(req, res) {
	res.end('Hello from api!');
});

router.get('/clients', clientsController.list);
router.get('/clients/all', clientsController.all);
router.post('/client', clientsController.add);
router.put('/client/:id', clientsController.update);
router.delete('/client/:id', clientsController.delete);

router.get('/projects', projectsController.list);
router.post('/project', projectsController.add);
router.put('/project/:id', projectsController.update);
router.delete('/project/:id', projectsController.delete);

router.get('/timecards', timeCardController.list);
router.post('/timecard', timeCardController.add);
router.put('/timecard/:id', timeCardController.update);
router.delete('/timecard/:id', timeCardController.delete);

module.exports = router;
