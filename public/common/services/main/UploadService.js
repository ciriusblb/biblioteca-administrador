(function(){
	'use strict'
	angular.module('common.services')
		.factory('UploadResource',uploadresource);

	function uploadresource($resource){
		return $resource('/uploadFile/:id',{idBricks:'@id'},{
			'get': {method:'GET'},
			'query': {method: 'GET',isArray:true},
			'update' : {method : 'PUT',url:'/'},
			'save': { method: 'POST',url:'/Load',transformRequest:imagenes,headers:{'Content-Type':undefined}},
			'remove': { method:'DELETE' }
		});
		function imagenes(data) {
		    if(undefined === data) return data;
		    var formData = new FormData();
		    angular.forEach(data, function(value, key) {
		      if(value instanceof FileList) {
		        if(value.length === 1)
		          formData.append(key, value[0]);
		        else {
		          angular.foreach(value, function(file, index) {
		            formData.append(key + '_' + index, file);
		          });
		        }
		      } else {
		        formData.append(key, value);
		      }
		    });
		    return formData;
		  };
	};
}());
