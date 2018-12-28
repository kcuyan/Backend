'use strict'

var express = require('express');
var ProjectController = require('../controllers/project')

var router = express.Router();

//middelwares: es algo que se ejecuta antes de que se ejecute el metodo o la accion del controlador

var multipart = require('connect-multiparty');
var multipartMiddelware = multipart({uploadDir: './uploads'});

router.get('/home', ProjectController.home);
router.post('/test', ProjectController.test);
router.post('/save-project', ProjectController.saveProject);
router.get('/project/:id?', ProjectController.getProjetc);
router.get('/projects', ProjectController.listProject);
router.put('/project/:id', ProjectController.updateProject);
router.delete('/project/:id', ProjectController.deleteProject);
router.post('/upload-image/:id', multipartMiddelware, ProjectController.uploadimage);

module.exports = router;