(function(){
	"use strict";
	angular.module('common.services')
	  	.factory('CrudResource',CarreraResource);
	  
	function CarreraResource($resource)
	{
		return $resource('/Administrador/:id',{idBricks:'@id'}, { 
			'get':    {method:'GET',isArray:true,url:'/GetCodigo'},
			'query': { method: 'GET',isArray:true},
            'update': { method: 'PUT',url:'/Update'},
	        'save': { method: 'POST',url:'/Send'},
	        'remove': { method:'DELETE',url:'/Delete'}
		});
	};

}());
