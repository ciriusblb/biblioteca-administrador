
'use strict';
var express= require('express'),
    getHistorial=require('./model').getHistorial,
    getHistorialAreas = require('./model').getHistorialAreas;


var mainController = function(server){
  console.log("entro");
    server.route('/estadistica')
    	.get(function(req,res){

    		getHistorial(function(error,data){
        	    res.send(data);
       		});
    		
    	})
    server.route('/areas')
      .get(function(req,res){
        console.log("hola");
        getHistorialAreas(function(error,data){
              res.send(data);
          });
        
      })

}

    module.exports=mainController;

