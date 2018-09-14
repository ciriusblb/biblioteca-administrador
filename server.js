'use strict';
var express = require('express'),
	http = require('http'),
    server = express(),
    swig = require('swig'),
    bodyParser=require('body-parser'),
    formidable= require('express-form-data');
	
// var   port = process.env.PORT || 8000;


// server.use(bodyParser({limit: '50mb'}));

var app = http.createServer(server).listen(7000);
var io = require("socket.io").listen(app);

server.use(bodyParser.urlencoded({ extended: false }));

server.use(bodyParser.json());

server.use(formidable.parse({keepExtensions:true}));


require('./apps/main/controller')(server,io);
require('./apps/usuarios/controller')(server,io);
require('./apps/reservas/controller')(server,io);
require('./apps/estadistica/controller')(server);
require('./apps/reportes/controller')(server);

//Templates
server.engine('html',swig.renderFile);
server.set('view engine','html');
// server.set('views', __dirname + '/public');
swig.setDefaults({cache:false});
//fin de templates

// //Archivos estaticos
server.use(express.static(__dirname+'/public'));

	

// server.listen(port,function(){
	console.log("Servidor escuchando al puerto 7000");
// });

// require('./routers')(server);

