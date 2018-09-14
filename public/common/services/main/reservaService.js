(function(){
	'use strict'
	angular.module('common.services')
		.factory('reservaService',reservaService);

	function reservaService($resource){
		console.log("data");
		return $resource('/getReserva/:id',{idBricks:'@id'},{
			'get': {method:'GET'},
			'query': {method: 'GET',isArray:true,url:'/getReserva'},
			'user' : {method: 'GET',isArray:true,url:'/getPenalizado'},
			'prestado': {method: 'GET',isArray:true,url:'/getPrestamos'},
			'ultimo' : {method: 'GET',isArray:true,url:'/ultimo'},
			'update' : {method : 'PUT',url:'/cambio'},
			'penalizar' : {method : 'PUT',url:'/penalizar'},
			'prestando':{ method: 'POST',url:'/prestando'},
			'save': { method: 'POST',url:'/'},
			'remove': { method:'DELETE',url:'/eliminar' },
			'delete': { method:'DELETE',url:'/removeRes' }

		});
	};
}());
