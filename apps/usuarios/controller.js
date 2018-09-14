'use strict';
var express= require('express'),
	fs= require('fs-extra'),

	getUsuario = require('./model').getUsuario,
	actualizarEstado = require('./model').actualizarEstado,
	cambiarEstado = require('./model').cambiarEstado,
	showFree = require('./model').showFree,
	showPenalized = require('./model').showPenalized,
	getNewUsuario = require('./model').getNewUsuario;

    // router = express.Router();

// resource de la vista perfil

var mainController = function(server,io){

	io.on('connection',function(socket){
		socket.join('usuarios');
	});


	 server.route('/getUsuario')
	 	.get(function(req,res){
	 		getUsuario(function(error,data){
	 			res.send(data);
	 		});
	 	});

	 server.route('/Penalizado')
	 	.put(function(req,res){
	 		actualizarEstado(req.body,function(error,data){
	 			res.send(data);
	 		});
	 	});

	 server.route('/cambio')
	 	.put(function(req,res){
	 		cambiarEstado(req.body,function(error,data){
	 			res.send(data);
	 		});
	 	});

	 server.route('/userFree')
	 	.get(function(req,res){
	 		showFree(function(error,data){
	 			res.send(data);
	 		});
	 	});

	 server.route('/userPenalized')
	 .get(function(req,res){
	 	showPenalized(function(error,data){
	 		res.send(data);
	 	});
	 });


	 // traer usuarios nuevos
setInterval(function(){
	getUsuario(function(error,data){
		io.to('usuarios').emit('newUsuario',data);
	})
},1000);


}
module.exports = mainController;