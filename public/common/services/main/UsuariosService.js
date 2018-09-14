(function(){
	'use strict'
	angular.module('common.services')
		.factory('UsuariosService',UsuariosService);

	function UsuariosService($resource){
		return $resource('/getUsuario/:id',{idBricks:'@id'},{
			'get': {method:'GET'},
			'query': {method: 'GET',isArray:true},
			'update' : {method : 'PUT',url:'/Penalizado'},
			'cambio': { method: 'PUT', url: '/cambio'},
			'save': { method: 'POST',url:'/'},
			'remove': { method:'DELETE' },
			'Free': {method: 'GET',isArray:true,url:'/userFree'},

			'Penalized': {method: 'GET',isArray:true,url:'/userPenalized'}
		
		});
	};
}());