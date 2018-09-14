(function(){
	"use strict";
	angular.module('common.services')
	  .factory('DateResource',DateResource);
	  
	function DateResource($resource)
	{
		this.datas=[];
		return $resource('/reportes/:idBricks',{idBricks:'@id'}, { 
			'get':    {method:'GET'},
			'query': { method: 'GET', isArray: true},
			'call': { method: 'GET', isArray: true,url:'/usuarios'},
            'update': { method: 'PUT'},
	        'save': { method: 'POST'},
	        'remove': { method:'DELETE'}
		});	

	};

}());