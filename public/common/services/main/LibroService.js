(function(){
	"use strict";
	angular.module('common.services')
	  	.factory('LibroResource',LibroResource);
	  
	function LibroResource($resource)
	{
		return $resource('/Administrador/:id',{idBricks:'@id'}, { 
			'get':    {method:'GET',url:'/getCodLibro'},
			'query': { method: 'GET',isArray:true},
            'update': { method: 'PUT',url:'/'},
	        'save': { method: 'POST',url:'/'},
	        'remove': { method:'DELETE',url:'/'}
		});
	};

}());