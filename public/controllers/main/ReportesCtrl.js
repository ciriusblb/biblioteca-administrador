(function(){
	'use strict';
	 angular.module('booksApp')
	  .controller("ReportesCtrl", reportesCtrl);
	  function reportesCtrl($http,DateResource,$timeout,$scope,$filter){

	  	var me = this;
	  	        $scope.anio=[
        {id:1,array:[],mes:'Enero',value:false},
        {id:2,array:[],mes:'Febrero',value:false},
        {id:3,array:[],mes:'Marzo',value:false},
        {id:4,array:[],mes:'Abril',value:false},
        {id:5,array:[],mes:'Mayo',value:false},
        {id:6,array:[],mes:'Junio',value:false},
        {id:7,array:[],mes:'Julio',value:false},
        {id:8,array:[],mes:'Agosto',value:false},
        {id:9,array:[],mes:'Septiembre',value:false},
        {id:10,array:[],mes:'Octubre',value:false},
        {id:11,array:[],mes:'Noviembre',value:false},
        {id:12,array:[],mes:'Diciembre',value:false}
        ];


        $scope.usuarios=[
        {id:1,array:'prestamo',usuarios:'Usuarios con Prestamos',value:false},
        {id:2,array:'reserva',usuarios:'Usuarios con Reservas',value:false},
        {id:3,array:'penalizado',usuarios:'Usuarios Penalizados',value:false},
        {id:4,array:'espera',usuarios:'Usuarios con Esperas',value:false},
        ]

	  	DateResource.query(function(data){
	  		me.data = data;
	  		for (var i = 0; i < $scope.anio.length; i++) {
	  			for (var j = 0; j < me.data.length; j++) {
	  				if($scope.anio[i].id==me.data[j].fecha_ingreso.split('-')[1]){
	  					$scope.anio[i].array.push(me.data[j]);
	  				}
	  			}
	  		}
	  		console.log($scope.anio);
	  	})
	  	var contador=1;

   		var date = new Date();
		me.FromDate = ('0' + date.getDate()).slice(-2) + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + date.getFullYear();
		if(date.getHours()<12){
		    me.FromTime = date.getHours() + ':' + ('0' + (date.getMinutes())).slice(-2) +'A.M.';
		}
		else{
		 	me.FromTime = (date.getHours()-12) + ':' + ('0' + (date.getMinutes())).slice(-2) +'P.M.';   
		}
		  me.cabecera = {
		  	tiempo:[
		      {text:me.FromTime,submit:true},
		      {text:me.FromDate,submit:true},
		    ]
		  };
		me.selectType = function(idx){
		  	switch($scope.usuarios[idx].id){
		  		case 1:
		  			DateResource.call({of:'prestamos'},function(data){
		  				me.prestamos=data;
		  				me.cabecera.data=me.prestamos;
		  				me.cabecera.identificar='prestamos';
		  				for (var i = 0; i < me.prestamos.length; i++) {
		  					me.prestamos[i].fecha_prestada=$filter('date')(new Date(me.prestamos[i].fecha_prestada), "dd-MM-yyyy HH:mm:ss");
		  				}
		  				crearPDF();
		  				// pintar(idx);
		  			})
		  		break;
		  		case 2: 
		  			DateResource.call({of:'reservas'},function(data){
		  				me.reservas=data;
		  				me.cabecera.data=me.reservas;
		  				me.cabecera.identificar='reservas';
		  				for (var i = 0; i < me.reservas.length; i++) {
		  					me.reservas[i].fecha_inicio=$filter('date')(new Date(me.reservas[i].fecha_inicio), "dd-MM-yyyy HH:mm:ss");
		  				}
		  				crearPDF();
		  				// pintar(idx);
		  			})
		  		break;
		  		case 3: 
		  			DateResource.call({of:'penalizados'},function(data){
		  				me.penalizados=data;
		  				me.cabecera.data=me.penalizados;
		  				me.cabecera.identificar='penalizados';
		  				crearPDF();
		  				// pintar(idx);
		  			})
  				break;
		  		case 4: 
		  			DateResource.call({of:'esperas'},function(data){
		  				me.esperas=data;
		  				me.cabecera.data=me.esperas;
		  				me.cabecera.identificar='esperas';
		  				crearPDF();
		  				// pintar(idx);
		  			})
  				break;

		  	}
		}
		    me.selectMonth= function(idx){
	            $scope.anio[idx].value=!$scope.anio[idx].value;
	        }
	        function crearPDF(){
	        	console.log(me.cabecera);
	        	$http.post('/reporte/',me.cabecera).
			    then(function(datas) {
	    			var blob = new Blob([me.decodificar(window.atob(datas.data))], {
						    type: 'application/pdf'
						});
					var link=document.createElement('a');
					link.href=window.URL.createObjectURL(blob);
					link.download="reporte.pdf";
					link.click();
						for (var i = 0; i < $scope.usuarios.length; i++) {
					  		$("#"+$scope.usuarios[i].array).removeClass('active');
					  	}
			        });
	        }
	

		  me.createPdf=function(){

			    me.cabecera.identificar='libros';
			    me.cabecera.data=$scope.anio;


			    $http.post('/reporte/',me.cabecera).
			    then(function(datas) {
			    	console.log("reporte",datas);
	    			var blob = new Blob([me.decodificar(window.atob(datas.data))], {
						    type: 'application/pdf'
						});
					var link=document.createElement('a');
					link.href=window.URL.createObjectURL(blob);
					link.download="reporte.pdf";
					link.click();
					for (var i = 0; i < $scope.anio.length; i++) {
                        if($scope.anio[i].value){
                            $("#"+$scope.anio[i].id).removeClass('active');
                        }
                        $scope.anio[i].value=false;
                    } 
			        });
		  }



		me.decodificar=function(s) {
		  var buf = new ArrayBuffer(s.length);
		  var view = new Uint8Array(buf);
		  for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
		  return buf;
		}
	  

	  }
}());