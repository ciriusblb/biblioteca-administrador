(function(){
	'use strict'
	angular.module('common.services')
		.factory('PrestamoResource',PrestamoResource);

	function PrestamoResource($resource){
		console.log("data");
		return $resource('/good/:id',{idBricks:'@id'},{
			'get': {method:'GET' ,isArray:true, url:'/verificar'},
			'query': {method: 'GET',isArray:true,url:'/'},
			'prestado': {method: 'GET',isArray:true,url:'/'},
			'update' : {method : 'PUT',url:'/'},
			'save': { method: 'POST',url:'/insertar'},
			'notificaciones': { method: 'POST' , url:'/notificaciones'},
			'remove': { method:'DELETE',url:'/EliminarPretamo' }
		});
	};
}());
