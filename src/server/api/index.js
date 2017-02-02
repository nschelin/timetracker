'use strict';
const router = require('express').Router();
const CompanyController = require('./controllers/company');
const ProjectController = require('./controllers/project');
const ProjectCodeController = require('./controllers/projectcode');
const ResourceController = require('./controllers/resource')

router.get('/', function(req, res){
	res.end('Hello from api!');
})

// Company
router.get('/company', CompanyController.list);
router.get('/company/:id', CompanyController.detail);
router.post('/company', CompanyController.new);
router.patch('/company/:id', CompanyController.update);

// Project
router.get('/project', ProjectController.list);
router.get('/project/:id', ProjectController.detail);
router.post('/project', ProjectController.new);
router.patch('/project/:id', ProjectController.update);

// Project Code
router.get('/projectcode', ProjectCodeController.list);
router.get('/projectcode/:id', ProjectCodeController.detail);
router.post('/projectcode', ProjectCodeController.new);
router.patch('/projectcode/:id', ProjectCodeController.update);

// Resource
router.get('/resource', ResourceController.list);
router.get('/resource/:id', ResourceController.detail);
router.post('/resource', ResourceController.new);
router.patch('/resource/:id', ResourceController.update);

module.exports = router;