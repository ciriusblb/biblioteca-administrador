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

dataModels.notificaciones = function(data,callback){
	if (connection) {
		var sql = 'delete from esperas where id_espera = '+connection.escape(data.id_espera)+'';
		connection.query(sql,function(error,row){
			if(error) throw error;
			else {
				var sql = 'insert into notificaciones(codigo_usuario,codigo_libro,descripcion,estado,tipo) values ('+connection.escape(data.codigo_usuario)+
				','+connection.escape(data.codigo_libro)+
				',CONCAT("El libro ", fnCodLibro('+connection.escape(data.codigo_libro)+')," ya esta disponible tiene la opcion de reservarlo "),0,"info" )';

				connection.query(sql,function(error,row){
					if (error) {
						throw error;
					}else{
					   callback(null,{msg:'notificado'});
					}
				})
			}
		})
	}
}


dataModels.verificar = function(data,callback){

	if (connection) {
		var sql = 'SELECT * FROM esperas where codigo_libro = '+connection.escape(data.codigo)+'';

		connection.query(sql,function(error,row){
			if(error){
				throw error;
			}else{
				callback(null,row);
			}
		})		
	}


}

//dashboard
dataModels.Publicacion = function(data,callback){
	if (connection) {
		var sql = 'INSERT INTO publicaciones (descripcion,img,titulo) VALUES ('+connection.escape(data.descripcion)+
		','+connection.escape(data.img)+
		','+connection.escape(data.titulo)+')';

		connection.query(sql,function(error,row){
			if (error) {
				throw error;
			}else{
				callback(null,{id_publicacion:row.insertId});
			}
		})
	}
}


dataModels.insertar = function(data,callback){
	if(connection){
		var sql = 'INSERT INTO historial (fecha_salida,fecha_limite,codigo_usuario,codigo_libro) VALUES ('+connection.escape(data.fecha_prestada)+
		','+connection.escape(data.fecha_limite)+
		','+connection.escape(data.codigo_usuario)+
		','+connection.escape(data.codigo_libro)+')';

		connection.query(sql, function(error,row){
			if(error){
				throw error;
			}else{
				callback(null,row);
			}
		})
	}
}

dataModels.EliminarPretamo = function(data,callback){
	if(connection){
		var sql = 'call spDevolverLibro('+connection.escape(data.codigo)+','+connection.escape(data.libro)+')';
			connection.query(sql, function(error,row){
				if(error){
					throw error;
				}else{
					var sql = 
					callback(null,{msg:'eliminado'});
				}
			})
	}

}


dataModels.getReserva = function(callback){
    if(connection)
	{
		var sql = "SELECT reservas.*,libros.titulo_l,libros.portada_l,libros.descripcion_l,libros.autor_l,usuarios.nombre_usuario,usuarios.apellido_usuario  from reservas,libros,usuarios where reservas.codigo_libro=libros.codigo_libro and reservas.codigo_usuario = usuarios.codigo_usuario";
		connection.query(sql, function(error,row){
			if(error){
				throw error;
			}else{
				callback(null,row);
			}
		});
	}
};


dataModels.getPrestamos = function(callback){
    if(connection)
	{
		var sql = "SELECT prestamos.*,libros.titulo_l,libros.portada_l,libros.cantidad_l,libros.descripcion_l,libros.autor_l,usuarios.nombre_usuario,usuarios.apellido_usuario  from prestamos,libros,usuarios where prestamos.codigo_libro=libros.codigo_libro and prestamos.codigo_usuario = usuarios.codigo_usuario ";
		connection.query(sql, function(error,row){
			if(error){
				throw error;
			}else{
				callback(null,row);
			}
		});
	}
};

dataModels.Dashboard = function(callback){

	if (connection) {
		var sql = "SELECT * FROM publicaciones";

		connection.query(sql,function(error,row){
			if(error){
				throw error;
			}else{
				callback(null,row);
			}
		})		
	}


}

dataModels.eliminar = function(data,callback){
    if(connection)
	{
		console.log(data);
		var sql = 'DELETE from reservas where codigo_reserva ='+connection.escape(data.cod)+';';
		connection.query(sql, function(error,row){
			if(error){
				throw error;
			}else{
				console.log(row);
				callback(null,row);
			}
		});
	}
};

dataModels.getLastReserva = function(callback){
	if(connection){
		var sql = 'call spGetReservas()';
		connection.query(sql,function(error,row){
			if(error) throw error;
			else callback(null,row[0][0]);
		})
	}
}

// dataModels.getAllReserva = function(callback){
// 	if(connection){
// 		var sql = 'select * from reservas()';
// 		connection.query(sql,function(error,row){
// 			if(error) throw error;
// 			else callback(null,row[0][0]);
// 		})
// 	}
// }

dataModels.removeRes = function(data,callback){
	if(connection){
		var sql = 'delete from reservas where codigo_reserva = '+connection.escape(data.codigo_reserva)+'';
		connection.query(sql,function(error,row){
			if(error) throw error;
			else callback(null,{msg: 'eliminaado'});
		})
	}
}

dataModels.verPrestamo = function(callback){
	if (connection) {
		var sql = 'select * from prestamos ';

		connection.query(sql,function(error,row){
			if (error) {throw error;}
			else {
				callback(null,row);
			}
		})
	}
}


dataModels.getPenalizado = function(data,callback){
	if (connection) {
		var sql = 'SELECT estado_u.codigo_usuario,estado_u.penalizado from estado_u where estado_u.codigo_usuario = '+connection.escape(data.codigo_usuario)+'';
		connection.query(sql,function(error,row){
			if (error) {
				throw error;
			}else{
				callback(null,row);
			}
		})	
	}
}
dataModels.penalizar = function(data,callback){
	if(connection){
		var sql='update estado_u set penalizado = "Penalizado" where codigo_usuario='+connection.escape(data.codigo_usuario)+'';
		connection.query(sql,function(error,row){
			if(error) throw error;
			else callback(null,{msg:'penalizado'});
		})
	}
}

dataModels.prestando= function(data,callback){
	if(connection){
		var sql = 'delete from reservas where codigo_reserva = '+connection.escape(data.codigo_prestamo)+'';
		connection.query(sql,function(error,row){
			if(error) throw error;
			else {
				var sql = 'insert into prestamos(codigo_prestamo,codigo_libro,codigo_usuario,fecha_prestada,fecha_limite) values('+
				connection.escape(data.codigo_prestamo)+','+
				connection.escape(data.codigo_libro)+','+
				connection.escape(data.codigo_usuario)+','+
				connection.escape(data.fecha_prestada)+','+
				connection.escape(data.fecha_limite)+')';
				connection.query(sql,function(error,row){
					if(error) throw error;
					else{
						callback(null,{msg:'prestado'});
					}
				})
			}
		})
	}
}

module.exports = dataModels;