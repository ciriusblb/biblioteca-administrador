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

dataModels.deleteBooks = function(data,callback){
	if (connection) {
		var sql = 'delete from libros WHERE id_libro='+connection.escape(data.id_libro)+'';
		connection.query(sql,function(error,row){
			if (error) {
				throw error;
			}else{
				callback(null, 'eliminado');
			}
		});
	}
}

dataModels.ShowCodigo = function(callback){
	if (connection) {
		var sql = 'call spCodigo()';
		connection.query(sql,function(error,row){
			if (error) {
				throw error;
			}else{

				callback(null,row[0]);
			}			
		});
	}
}

dataModels.editBooks = function(data,callback){
	if(connection)
	{	
		var sql = 'SELECT cantidad_l from libros where codigo_libro = '+connection.escape(data.codigo_libro)+'';
		connection.query(sql,function(error,row){
			if(error) throw error;
			else{
				if(row[0].cantidad_l==0){
					console.log("cantidad ",row[0]);
					var sql1 = 'SELECT codigo_usuario from esperas where codigo_libro='+connection.escape(data.codigo_libro)+'';
					connection.query(sql1,function(error,row1){
						if(error) throw error;
						else {
							// if(row1.length>0){
								console.log("usuarios ",row1);
								var notificaciones = row1;
								console.log("usuarios ",notificaciones);
								console.log("rimer usuario ",notificaciones[0].codigo_usuario);
								console.log("cantidad ",notificaciones.length);
								// var i =0;
								// var getNot = setInterval(function(){
									for (var i = 0; i < notificaciones.length; i++) {
										var sql3= 'call spNotificarLibroEditado('+connection.escape(notificaciones[i].codigo_usuario)+','+connection.escape(data.codigo_libro)+')';
										connection.query(sql3,function(error,row3){
											if(error) throw error;
											else{
												i++;
												if(i==notificaciones.length){
													console.log('eliminado de esperas y notificado');
													clearTimeout(getNot)
												}
											} 

										})
									}
						}
					})
				}
				var sql = 'UPDATE libros SET titulo_l='+connection.escape(data.titulo_l)+
					',autor_l='+connection.escape(data.autor_l)+
					',descripcion_l='+connection.escape(data.descripcion_l)+
					',portada_l='+connection.escape(data.portada_l)+
					',cantidad_l='+connection.escape(data.cantidad_l)+
					',area_l='+connection.escape(data.area_l)+
					', editado = '+connection.escape(data.editado)+
					' WHERE codigo_libro= '+connection.escape(data.codigo_libro)+'';
					connection.query(sql, function(error, row) 
					{
						if(error){ throw error;}
						else{	
							callback(null, 'editado');
					}
				});
			}
		})
	}	
}



dataModels.getBooks =function(callback){
    if(connection)
	{
		var sql = "SELECT * from libros ";
		connection.query(sql, function(error,row){
			if(error){
				throw error;
			}else{
				callback(null,row);
			}
		});
	}
};


dataModels.getCantidadBooks = function(callback){
	if (connection) {
		var sql = 'SELECT codigo_libro,cantidad_l from libros';
		connection.query(sql,function(error,row){
			if(error) throw error;
			else callback(null,row);
		})
	}
}



dataModels.sendBooks = function(data,callback){
	if(connection){
		var sql = 'call spCodigoArea('+connection.escape(data.area_l)+');'
		
		connection.query(sql,function(error,row){
			if(error){
				throw error;
			}else{
				var sql = 'INSERT into libros(codigo_libro,titulo_l,autor_l,descripcion_l,portada_l,cantidad_l,area_l,editado) values ('+connection.escape(data.codigo_libro)+
				','+connection.escape(data.titulo_l)+
				','+connection.escape(data.autor_l)+
				','+connection.escape(data.descripcion_l)+
				','+connection.escape(data.portada_l)+
				','+connection.escape(data.cantidad_l)+
				','+connection.escape(row[0][0].codigo_area)+
				','+connection.escape(data.editado)+')';


				connection.query(sql,function(error,row){
					if (error) {
						throw error;
					}else{
						callback(null,{id_libro:row.insertId});
					}
				})
					
			}
		});
	}
}



// dataModels.uploadUsuario=function(data,callback){
// 	if(connection)
// 	{	
// 		var sql = 'UPDATE usuarios SET perfil_usuario='+connection.escape(data.file)+' WHERE codigo_usuario= '+connection.escape(data.codigo)+'';
// 		connection.query(sql, function(error, row) 
// 		{
// 			if(error)
// 			{
// 				throw error;
// 			}
// 			else
// 			{	
// 				callback(null, {url:data.file});
// 			}
// 		});

// 	}
// };



module.exports =dataModels;