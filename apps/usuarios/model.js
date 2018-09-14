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

dataModels.showPenalized = function(callback){
	if (connection) {
		var sql = 'SELECT usuarios.*,estado_u.penalizado from usuarios,estado_u where estado_u.penalizado = "Penalizado" and usuarios.codigo_usuario=estado_u.codigo_usuario';
		connection.query(sql,function(error,row){
			if(error){
				throw error;
			}else{
				callback(null,row);
			}
		});
	}
}

dataModels.showFree = function(callback){
	if(connection){
		var sql = 'SELECT usuarios.*,estado_u.penalizado from usuarios,estado_u where estado_u.penalizado = "Libre" and usuarios.codigo_usuario=estado_u.codigo_usuario';
		connection.query(sql,function(error,row){
			if(error){
				throw error;
			}else{
				callback(null,row);
			}
		});
	}
}

dataModels.getUsuario = function(callback){
    if(connection)
	{
		var sql = "SELECT usuarios.*,estado_u.penalizado from usuarios,estado_u where usuarios.codigo_usuario=estado_u.codigo_usuario ";
		connection.query(sql, function(error,row){
			if(error){
				throw error;
			}else{
				callback(null,row);
			}
		});
	}
};


dataModels.cambiarEstado = function(data,callback){
	if(connection){
		var sql = 'UPDATE estado_u SET 	penalizado = "Libre" where codigo_usuario = '+connection.escape(data.codigo_usuario)+'';
		connection.query(sql, function(error,row){
			if(error){
				throw error;
			}else{
				callback(null,row);
			}
		}) ;
	}
};

dataModels.actualizarEstado =function(data,callback){
    if(connection)
	{
		var sql = 'UPDATE estado_u SET penalizado = "Penalizado" where codigo_usuario = '+connection.escape(data.codigo_usuario)+'';
		connection.query(sql, function(error,row){
			if(error){
				throw error;
			}else{
				callback(null,row);
			}
		});
	}
};

dataModels.getNewUsuario = function(callback){
	if(connection){
		var sql = 'call spNewUsuario()';
		connection.query(sql,function(error,row){
			if(error) throw error;
			else callback(null,row[0][0]);
		})
	}
}
module.exports = dataModels;