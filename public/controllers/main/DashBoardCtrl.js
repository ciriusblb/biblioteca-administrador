(function(){
	"use strict";
	angular.module("booksApp")
		.controller("DashBoardCtrl",dashBoardCtrl);

		function dashBoardCtrl($scope,$timeout,DashboardResource,UploadResource){
		var me=this;
		console.log('DashBoardCtrl'); 
		$scope.newImages={
		 	image:''
		};
		me.publicacion = {
			id_publicacion:0,
			descripcion:'',
			img:'',
			titulo:'',
			class:''
		}
    	DashboardResource.query(function(data){
			var aux;	
			for(var a = 0; a<data.length;a++){
				for(var b = a+1;b < data.length;b++){
					if(data[b].id_publicacion>data[a].id_publicacion){
						aux=data[b];
						data[b]=data[a];
						data[a]=aux;
					}
				}
			}
			
			for(var i = 0;i<data.length ;i++){
				if (data[i].id_publicacion%2==0) {
					data[i].class='notificacion';
				}else{
					data[i].class='timeline-inverted';
				}
			}
			me.imagenValue=false;
			me.dashboard=data;
			// console.log(me.dashboard);
		})
		me.publicar = function(){
			// console.log(me.publicacion);
			if(me.publicacion.img!=""){
				console.log(" publicar ",me.publicacion);
				DashboardResource.save(me.publicacion,function(data){
				DashboardResource.load($scope.newImages,function(result){
				console.log(result);

					if(data.id_publicacion%2==0){
							me.publicacion.class='notificacion';
						}else{
							me.publicacion.class='timeline-inverted';
						}
						me.publicacion.id_publicacion=data.id_publicacion;
		               	me.dashboard.unshift(me.publicacion);
		               	console.log(me.dashboard);
						me.imagenValue=false;				
                });

			})
			}else{
				console.log("no publciar ",me.publicacion);
			}
		} 


		$scope.photoChanged = function(files){
		 	console.log();
		 	if(me.dashboard.length==0){
		 		me.publicacion.img = 'PU000001.'+files[0].name.split('.')[1];
		 	}
		 	else{
		 		var cadena = me.dashboard[0].img.split('.')[0],
                subCadena = cadena.substring(2, 8);
                subCadena = parseInt(subCadena)+1;
                subCadena = String(subCadena);
                while(subCadena.length<6){
                    subCadena='0'+subCadena;
                }
                me.publicacion.img='PU'+subCadena+'.'+files[0].name.split('.')[1];
                console.log("codigo ",me.publicacion.img); 
		 	}
            if (files != null) {
                var file = files[0];
                    $timeout(function() {
                        var fileReader = new FileReader();
                        fileReader.readAsDataURL(file);
                        fileReader.onload = function(e) {
                            $timeout(function(){
                                me.imagen = e.target.result;
                              	me.imagenValue=true;
                            });
                        }
                    });
            }
        };
	}
}());