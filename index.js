'use strict'

var mongoose = require('mongoose'); // cargo la libreria

mongoose.Promise = global.Promise;//cargar la base de datos

mongoose.connect('mongodb://localhost:27017/portafolio') //conexion de base de dato
    .then(()=>{
        console.log("conexion a la base de datos establecida..");
    })
    .catch(err => console.log(err));

