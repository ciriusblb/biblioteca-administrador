(function(){
	"use strict";
	var app = angular.module("booksApp",["ui.router","common.services","ngMessages","ngCookies","ui.mask","ui.bootstrap"]);
	app.config(function($stateProvider,$urlRouterProvider){
		$urlRouterProvider.otherwise('/BooksApp/Usuarios');
		
		$stateProvider
		   	.state('DashBoard',{
			   	url: '/BooksApp/DashBoard',
			   	templateUrl:'/views/DashBoard.html',
			   	controller:'DashBoardCtrl as vm'
		   	})
		   	.state('Usuarios',{
			   	url: '/BooksApp/Usuarios',
			   	templateUrl:'/views/Usuarios.html',
			   	controller:'UsuariosCtrl as vm'
		   	})
		   	.state('CRUD',{
			   	url: '/BooksApp/CRUD',
			   	templateUrl:'/views/CRUD.html',
			   	controller:'CRUDCtrl as vm'
		   	})
		    .state('Reservas',{
		   	 	url: '/BooksApp/Reservas',
		   	 	templateUrl:'/views/Reservas.html',
		   	 	controller:'ReservasCtrl as vm'
		   	})
		   	.state('Estadisticas',{
		   	 	url: '/BooksApp/Estadisticas',
		   	 	templateUrl:'/views/Estadisticas.html',
		   	 	controller:'EstadisticasCtrl as vm'
		   	})
		   	.state('Reportes',{
		   	 	url: '/BooksApp/Reportes',
		   	 	templateUrl:'/views/Reportes.html',
		   	 	controller:'ReportesCtrl as vm'
		   	})



		  //  	$httpProvider.defaults.transformRequest = function(data) {
		  //   if(undefined === data) return data;
		  //   var formData = new FormData();
		  //   angular.forEach(data, function(value, key) {
		  //     if(value instanceof FileList) {
		  //       if(value.length === 1)
		  //         formData.append(key, value[0]);
		  //       else {
		  //         angular.foreach(value, function(file, index) {
		  //           formData.append(key + '_' + index, file);
		  //         });
		  //       }
		  //     } else {
		  //       formData.append(key, value);
		  //     }
		  //   });
		  //   return formData;
		  // };
		  // $httpProvider.defaults.headers.post['Content-Type'] = undefined;
		  // $httpProvider.defaults.headers.common['Content-Type'] = undefined;
		  // $httpProvider.defaults.headers.put['Content-Type'] = undefined;

	});


}());