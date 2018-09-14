'use strict';
var mysql = require('../../config/mysql');

var connection=mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: '',
   database: 'library',
   port: 3306
});



var dataModels ={};
dataModels.getHistorial = function(callback){
	var sql = 'select * from historial';
	connection.query(sql,function(error,row){
		if (error) throw error;
		else callback(null,row);
	})
}
dataModels.getHistorialAreas = function(callback){
	var sql = 'call spGetHistorial()';
	connection.query(sql,function(error,row){
		if (error) throw error;
		else {
			callback(null,row[0]);
		}
	})
}






module.exports =dataModels;

