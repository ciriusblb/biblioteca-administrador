'use strict';
var express= require('express'),
	fs= require('fs-extra'),
	getBooks = require('./model').getBooks,
	sendBooks = require('./model').sendBooks,
	editBooks = require('./model').editBooks,
	deleteBooks = require('./model').deleteBooks,
	ShowCodigo = require('./model').ShowCodigo,
	getCantidadBooks=require('./model').getCantidadBooks;

    // router = express.Router();
		 			// fs.removeSync('public/Books/actividades.png');
// resource de la vista perfil


var mainController = function(server,io){


	io.on('connection',function(socket){
		console.log("socket funcionando");
		socket.join('libros');

	});



var codigo ='';
	server.route('/upload')
	 	.post(function(req,res){

	 		console.log('req.files ',req.files.image.name);
	 	});



	 	server.route('/Delete')
	 	.delete(function(req,res){
	 		fs.removeSync('public/Books/'+req.query.portada_l);
		 		deleteBooks(req.query,function(error,data){


		 		res.send(data);
	 		});
		});




	 server.route('/Administrador')
	 	.get(function(req,res){
	 		getBooks(function(error,data){
	 			res.send(data);
	 		});
	 	});



	 server.route('/Load')
	 	.post(function(req,res){
	 			// var extension = req.files.image.name.split('.');
	 			console.log("Mis files",req.files.image.name);
				fs.copy(req.files.image.path,'public/Books/'+codigo);
				var source = codigo;
				res.send({source:source});
	 	})


	 server.route('/GetCodigo')
	 	.get(function(req,res){

	 	ShowCodigo(function(error,data){
	 		res.send(data);
	 	});
	})




	 server.route('/Send')
	 	.post(function(req,res){
	 		console.log("controlador ",req.body.codigo_libro);
	 		codigo = req.body.portada_l;
	 		console.log(codigo);
	 	sendBooks(req.body,function(error,data){
	 		res.send(data);
	 	});
	})







	server.route('/Update')
	.put(function(req,res){
		editBooks(req.body,function(error,data){
			res.send(data);
		});
	});

	setInterval(function(){
		getCantidadBooks(function(error,data){
	 			io.to('libros').emit('actualizandoLibros',data);
	 		});
	},1000);



}
module.exports = mainController;