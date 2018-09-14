(function(){
	"use strict";
	angular.module('common.services')
	  	.factory('estadisticaService',estadisticaService);
	  
	function estadisticaService($resource)
	{
		return $resource('/estadistica/:id',{idBricks:'@id'}, { 
            'get':    {method:'GET'},
            'query': { method: 'GET',isArray:true},
            'areas': { method: 'GET',isArray:true,url:'/areas'},

            'update': { method: 'PUT'},
            'save': { method: 'POST'},
            'remove': { method:'DELETE'}
		});
	};

}());
