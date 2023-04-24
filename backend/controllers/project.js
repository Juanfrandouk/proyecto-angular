'use strict'

var Project= require('../models/project');
var fs = require('fs');
var path= require('path');

var controller = {

        home:function(req,res){
            return res.status(200).send({
                message: 'Soy la home'
            });

        },
        test:function(req,res){
            return res.status(200).send({
                message: "Soy el metodo o accion test"
            });

        },
        saveProject:function(req,res){
            var project = new Project();

            var params = req.body;
             project.name = params.name;
             project.description = params.description;
             project.category = params.category;
             project.year= params.year;
             project.langs=params.langs;
             project.image=null;

            project.save((err,projectStore)=>{
                if(err) 
                  return  res.status(500).send({
                  message : 'error al guardar'});
                if(!projectStore)
                  return res.status(404).send({
                  message:'No se ha podido guardar el proyecto'});

                return res.status(200).send({
                    project: projectStore,
                    message:"Metodo saveProject"
                });
            });
        },

        getProject: function (req, res){
                var projectId =  req.params.id;
             /*    console.log(projectId); */
              if(projectId == null ) return res.status(404).send({message: 'El proyecto no existe.'}); 
            
                  Project.findById(projectId, (err, project) => {
                    if (err) return res.status(500).send({message:'Error al devolver los datos.'});
                    if(!project) return res.status(404).send({message: 'El proyecto no existe.'});

                    return res.status(200).send({
                        project
                    });
                });            
        },

        getProyects: function(req, res){
                Project.find({}).sort('year').exec((err, projects)=>{
                        if(err)return res.status(500).send({message:'Error al devolver los datos.'});
                        if(!projects) return res.status(404).send({message: 'Proyectos no encontrados.'});


                        return res.status(200).send({
                            projects
                        });
                });
        },

        updateProject:function(req, res){
            var projectId = req.params.id;
            var update = req.body;           

            Project.findByIdAndUpdate(projectId,update,{new:true},(err,projectUpdated)=>{
                if(err)return res.status(500).send({message:'Error al actualizar.'});
                if(!projectUpdated) return res.status(404).send({message: 'Proyecto no actualizado.'});

                return res.status(200).send({
                    project: projectUpdated
                });
            });
        },

        deleteProject:function(req, res){
            var projectId = req.params.id;
            //findByIdAndRemove
            Project.findByIdAndDelete(projectId,(err,projectRemoved)=>{
                if(err)return res.status(500).send({message:'Error al borrar.'});      
                if(!projectRemoved) return res.status(404).send({message: 'Proyecto no borrado.'});
                return res.status(200).send({
                    project: projectRemoved
                });
            });
        },

    uploadImage:function(req, res){
            var projectId = req.params.id;
            var fileName = 'Imagen no subida ';

        if(req.files){
            var filePath = req.files.image.path;
            var fileSplit= filePath.split('\\');
            var fileName =fileSplit[1];
            var extSplit = fileName.split('\.');
            var fileExt = extSplit[1];

            if(fileExt == 'png' ||fileExt == 'jpg' ||fileExt == 'jpeg' ||fileExt == 'gif'){
             Project.findByIdAndUpdate(projectId,{image:fileName},{new:true}, (err, projectUpdated)=>{
                if(err)  return res.status(500).send({
                     message:'La imagen no ha sido actualizada'});
                if(!projectUpdated) return res.status(404).send({
                     message: 'Proyecto no existe.'});
                return res.status(200).send({
                    project: projectUpdated  
                });
               });
            } else {
                    fs.unlink(filePath, (err)=>{
                        return res.status(200).send({message:'la extension no es valida'});
                    });
            }
        }else {   
               return res.status(200).send({
                    message: fileName
                 });
        }
    },

    getImageFile:function(req, res){
            var file = req.params.image;
            var path_file = './uploads/'+file;
            fs.exists(path_file,(exists)=>{
                    if(exists){
                            return res.sendFile(path.resolve(path_file));
                    }else{
                        return res.status(200).send({
                                message: "no existe la imagen . . . "
                        });
                    } 
            });
    }
};

module.exports= controller;