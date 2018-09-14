'use strict';
var express = require('express'),
	fs = require('fs-extra'),
	getReserva=require('./model').getReserva,
	getPenalizado = require('./model').getPenalizado,
	getCodLibro=require('./model').getCodLibro,
	eliminar = require('./model').eliminar,
	getPrestamos = require('./model').getPrestamos,
	insertar = require('./model').insertar,
	EliminarPretamo = require('./model').EliminarPretamo,
	Publicacion = require('./model').Publicacion,
	Dashboard = require('./model').Dashboard,
	notificaciones = require('./model').notificaciones,
	verificar = require('./model').verificar,
	getLastReserva = require('./model').getLastReserva,
	getAllReservas = require('./model').getAllReservas,
	removeRes = require('./model').removeRes,
	verPrestamo = require('./model').verPrestamo,
	penalizar = require('./model').penalizar,
	prestando=require('./model').prestando;

var codigo;
var mainController = function(server,io){

	io.on('connection',function(socket){
		console.log("socket funcionando");
		socket.join('reservas');
		socket.join('prestamos');
		socket.join('dashboard');

	});



	server.route('/verificar')
		.get(function(req,res){
			verificar(req.query,function(error,data){
				res.send(data);
			})
		})

	 server.route('/getReserva')
	 	.get(function(req,res){
	 		getReserva(function(error,data){
	 			res.send(data);
	 		});
	 	});

	 server.route('/getPenalizado')
	 	.get(function(req,res){
	 		getPenalizado(req.query,function(error,data){
	 			res.send(data);
	 		});
	 	});


	server.route('/getPrestamos')
	 	.get(function(req,res){
	 		getPrestamos(function(error,data){
	 			res.send(data);
	 		});
	 	});

	 server.route('/Dashboard')
	 	.get(function(req,res){
	 		Dashboard(function(error,data){
	 			res.send(data);
	 		});
	 	})

	 server.route('/insertar')
	 	.post(function(req,res){
	 		insertar(req.body,function(error,data){
	 			res.send(data);
	 		})
	 	})

	 server.route('/notificaciones')
	 	.post(function(req,res){
	 		notificaciones(req.body,function(error,data){
	 			res.send(data);
	 		})
	 	})


//dashboard
	 server.route('/guardarPublicacion')
	 	.post(function(req,res){
	 		console.log("guardar ",req.body.img);
	 		codigo=req.body.img;
	 		Publicacion(req.body,function(error,data){
	 			res.send(data);
	 		})
	 	})
	
	server.route('/loadDashboard')
	 	.post(function(req,res){
	 			console.log("Mis files",req.files.image);
	 			console.log("codigo",codigo);

				fs.copy(req.files.image.path,'public/Dashboard/'+codigo);
				var source = codigo;
				res.send({source:source});
	 	})


	 server.route('/EliminarPretamo')
	 	.delete(function(req,res){
	 		EliminarPretamo(req.query,function(error,data){
	 			res.send(data);
	 		})
	 	})

	 server.route('/getCodLibro')
	 	.get(function(req,res){
	 		getCodLibro(function(error,data){
	 			res.send(data);
	 		});
	 	});

	 server.route('/eliminar')
	 	.delete(function(req,res){
	 		eliminar(req.query,function(error,data){
	 			res.send(data);
	 		});
	 	});
	 server.route('/removeRes')
	 	.delete(function(req,res){
	 		removeRes(req.query,function(error,data){
	 			res.send(data);
	 		});
	 	});
	server.route('/penalizar')
	 	.put(function(req,res){
	 		penalizar(req.body,function(error,data){
	 			res.send(data);
	 		});
	 	});


	server.route('/prestando')
		.post(function(req,res){
			prestando(req.body,function(error,data){
				res.send(data);
			})
		})

// elimina reseravs segun la fecha de vencimiento
setInterval(function(){
	 			getReserva(function(error,data){
	 			io.to('reservas').emit('eliminando',data);
	 		});
	 		},1000);

// agregar reservas
	 setInterval(function(){
	 	getLastReserva(function(error,data){
	 		io.to('reservas').emit('emitiendo',data);
	 	})
		},1000)

//actuzaliar reservas si el usuario hace un cambio
 setInterval(function(){
 	getReserva(function(error,data){
 		io.to('reservas').emit('actualizando',data);
 	})
 },1000)



// penalizar usuarios si se vence la fecha de prestamo
	setInterval(function(){
		verPrestamo(function(error,data){
			io.to('prestamos').emit('EliminarPrestamos',data);
		})
	},1000)



}

    module.exports=mainController;



