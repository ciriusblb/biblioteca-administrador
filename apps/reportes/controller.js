'use strict';
var express= require('express'),
    getBooks = require('./model').getBooks,
    getPrestamos=require('./model').getPrestamos,
    getReservas=require('./model').getReservas,
    getPenalizados=require('./model').getPenalizados,
    getEsperas=require('./model').getEsperas,
    createReporte = require('../reporte/pdf/index').createPDFBinary;
var mainController = function(server){

   server.route('/reporte/')
    .post(function (req, res) {
        createReporte(req.body, function(binary) {
          res.send(binary.toString('base64'));

          }, function(error) {
            res.end('ERROR:' + error);
        });

      });
  server.route('/reportes')
    .get(function(req,res){
      getBooks(function(error,data){
        res.send(data);
      });
    });

  server.route('/usuarios')
    .get(function(req,res){
      console.log(req.query.of);
      switch(req.query.of){
        case 'prestamos':
          getPrestamos(function(error,data){
            res.send(data);
          });
        break;
        case 'reservas':
          getReservas(function(error,data){
            res.send(data);
          });
        break;
        case 'penalizados': 
          getPenalizados(function(error,data){
            res.send(data);
          });
        break;
        case 'esperas': 
          getEsperas(function(error,data){
            res.send(data);
          });
        break;

      }
      
    });




}

    module.exports=mainController;