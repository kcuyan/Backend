'use strict'
var Project = require('../models/project');
var fs = require('fs');
var path = require('path');

var controller = {
    home: function(req, res){

        return res.status(200).send({
            message: 'soy la home'
        });

    },
    test: function(req, res){

        return res.status(200).send({
            message: 'Soy el metodo o accion test del cotrolador de project'
        });

    },

    saveProject: function(req, res){
        var project = new Project();

        var params = req.body;
        project.name = params.name;
        project.description = params.description;
        project.category = params.category;
        project.year = params.year;
        project.langs = params.langs;
        project.image = null;

        project.save((err, projectStored) =>{
            if(err) return res.status(500).send({message: 'Error al Guardar'});
            if(!projectStored) return res.status(404).send({message: 'No se ha podido guardar el proyecto'});

            return res.status(200).send({project: projectStored});
        });
    },

    getProjetc: function(req, res){
        var  projectId = req.params.id;
        
        if (projectId == null) return res.status(404).send({message: 'El Projector no existe'});

        Project.findById(projectId, (err, project) => {
            if(err) return res.status(500).send({message: 'error al devolver los datos.'});
            if(!project) return res.status(404).send({message: 'El Projector no existe'});
            
            return res.status(200).send({
                project
            });

        });
    },

    listProject: function(req, res){
        Project.find({}).sort('-year').exec((err, projects)=>{

            if(err) return res.status(500).send({message: 'Error al devolver los datos'});
            if(!projects) return res.status(404).send({message: 'No hay proyectos que mostrar'});

            return res.status(200).send({projects});

        });
    },

    updateProject: function(req, res){
        var projectId = req.params.id;
        var update = req.body;

        Project.findByIdAndUpdate(projectId, update, {new:true}, (err, projectUpdate) =>{
            if(err) return res.status(500).send({message: 'Error al actualizar'});
            if(!projectUpdate) return res.status(404).send({message: 'No existe el projecto para actualizar'});

            return res.status(200).send({
                project: projectUpdate
            });
        });
    },

    deleteProject: function(req, res){
        var projectId = req.params.id;
        Project.findByIdAndDelete(projectId, (err, projectDelete)=>{
            if(err) return res.status(500).send({message: 'No se ha podido borrar el proyecto'});
            if(!projectDelete) return res.status(404).send({message: 'No se puede eliminar este Projecto'});

            return res.status(200).send({
                project: projectDelete
            })
        });
    },

    uploadimage: function(req, res){
        var projectId = req.params.id;
        var fileName = 'Imagen No Subida...';

        if(req.files){
            var filePath = req.files.image.path;
            var fileSplit = filePath.split('\\');
            var fileName = fileSplit[1];
            var extSplit = fileName.split('\.');
            var fileExt = extSplit[1];
            
            if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif'){
                Project.findByIdAndUpdate(projectId, {image: fileName}, { new: true},(err, projectUpdated) => {
                    if(err) return res.status(500).send({message: 'la imagen no se ha subido'});
                    if(!projectUpdated) return res.status(404).send({message: 'El proyecto no existe y no se ha guardado la imagen.'})
    
                    return res.status(200).send({
                        project: projectUpdated
                    });
                });
            }else{
                    fs.unlink(filePath, (err) =>{//libreria fs para eliminar un archivo
                        return res.status(200).send({message: 'la extensión no es valida'});
                    });
            }
        }else{
            return res.status(200).send({
                message: fileName
            });
 
        }
    },

    getImageFile: function(req, res){
        var file = req.params.image;
        var pathFile = './uploads/'+file;

        fs.exists(pathFile, (exists) =>{
            if(exists){
                return res.sendFile(path.resolve(pathFile));
            }else{
                return res.status(200).send({
                    message: "No existe la Imagen..."
                });
            }
        });
    }
};

module.exports = controller;
