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
dataModels.getBooks =function(callback){
    if(connection)
	{
		var sql ='SELECT * FROM libros';
		connection.query(sql, function(error, row) 
		{
			if(error)
			{
				throw error;
			}
			else
			{
				callback(null,row);
			}
		});
	}
};
dataModels.getPrestamos=function(callback){
	if(connection){
		var sql = 'SELECT prestamos.*,usuarios.nombre_usuario,usuarios.apellido_usuario,libros.titulo_l,libros.autor_l FROM prestamos,usuarios,libros where prestamos.codigo_usuario= usuarios.codigo_usuario and prestamos.codigo_libro = libros.codigo_libro';
		connection.query(sql,function(error,row){
			if(error) throw error;
			else callback(null,row);
		})
	}
}
dataModels.getReservas=function(callback){
	if(connection){
		var sql='select reservas.*,usuarios.nombre_usuario,usuarios.apellido_usuario,libros.titulo_l,libros.autor_l from reservas,usuarios,libros where reservas.codigo_usuario = usuarios.codigo_usuario and reservas.codigo_libro = libros.codigo_libro;';
		connection.query(sql,function(error,row){
			if(error) throw error;
			else callback(null,row);
		})
	}
}
dataModels.getPenalizados=function(callback){
	if(connection){
		var sql='select usuarios.*,estado_u.penalizado from usuarios,estado_u where usuarios.codigo_usuario = estado_u.codigo_usuario and estado_u.penalizado = "Penalizado"';
		connection.query(sql,function(error,row){
			if(error) throw error;
			else callback(null,row);
		})
	}
}
dataModels.getEsperas=function(callback){
	if(connection){
		var sql='select esperas.*,usuarios.nombre_usuario,usuarios.apellido_usuario,libros.titulo_l,libros.autor_l from esperas,usuarios,libros where esperas.codigo_usuario = usuarios.codigo_usuario and esperas.codigo_libro = libros.codigo_libro;';
		connection.query(sql,function(error,row){
			if(error) throw error;
			else callback(null,row);
		})
	}
}

module.exports =dataModels;