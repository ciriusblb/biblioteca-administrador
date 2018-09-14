(function(){
	"use strict";
	angular.module("booksApp")
		.controller("ReservasCtrl",reservasCtrl);

		function reservasCtrl($scope,reservaService,$filter,PrestamoResource,socket){
			$scope.expression=true;
			var me=this;
			me.pos=0;
			me.imagen="";    
			console.log('ReservasCtrl');
			$scope.mostrar=true;
				me.pres=false;
				me.reser=false;
	
			reservas();
			function reservas(){
				reservaService.query(function(data){
					me.reservas=ordenar(data);
					console.log(me.reservas);	
				})	
			}
			function ordenar(data){
				var temp = {};
				for (var i = 0; i < data.length; i++) {
					for (var j = 0; j < data.length-1; j++) {
						if(data[j].id_reserva>data[j+1].id_reserva){
							temp = data[j];
							data[j]=data[j+1];
							data[j+1]=temp;
						}
					}
				}
				for (var i = 0; i < data.length; i++) {
					data[i].fecha_limite=new Date(data[i].fecha_limite);
				}
				return data;
			}
			me.reservass = function(){
				reservas();
			}
			me.prestamoss = function(){
				reservaService.prestado(function(data){
					for (var i = 0; i < data.length; i++) {
						data[i].fecha_limite=new Date(data[i].fecha_limite);
					}
					me.prestamo=data;
					console.log("prestamso",me.prestamo);
				})
			}



			socket.on('emitiendo',function(data){
				if(data!=null){
					data.fecha_limite=new Date(data.fecha_limite);
					if(me.reservas.length==0){
						me.reservas.push(data);
					}else{
						if(data.id_reserva!=me.reservas[me.reservas.length-1].id_reserva){
							me.reservas.push(data);
						}
					}
				}
				
				
			})

			socket.on('eliminando',function(data){
				var data = ordenar(data);
				for (var i = 0; i < data.length; i++) {
					// console.log(data[i].fecha_limite);
					if( new Date()> data[i].fecha_limite){
						for (var j = 0; j < me.reservas.length; j++) {
							if(data[i].codigo_reserva==me.reservas[j].codigo_reserva){
								reservaService.delete({codigo_reserva:me.reservas[j].codigo_reserva},function(data){
								})
								me.reservas.splice(j,1);
							}
						}
						
					}

				}
			})

			socket.on('actualizando',function(data){
				var data= ordenar(data);
				if(me.reservas.length!=data.length){
					me.reservas = data;
				}else{
					for (var i = 0; i < data.length; i++) {
						if($filter('date')(data[i].fecha_limite, "yyyy-MM-dd HH:mm:ss")!= $filter('date')(me.reservas[i].fecha_limite, "yyyy-MM-dd HH:mm:ss")){
							console.log("actualizar");
							me.reservas[i].fecha_limite= data[i].fecha_limite;
						}
					}
				}
			})

			socket.on('EliminarPrestamos',function(data){
				var usuarios=[];	
				for (var i = 0; i < data.length; i++) {
					if(new Date() > new Date(data[i].fecha_limite)){
					var insertar = false;
						for (var j = 0; j < usuarios.length; j++) {
							if(usuarios[j].codigo_usuario==data[i].codigo_usuario){
								insertar=true;
							}
						}
						if(insertar==false){
							usuarios.push({codigo_usuario:data[i].codigo_usuario});
						}
					}
				}
				for (var i = 0; i < usuarios.length; i++) {
					reservaService.user({codigo_usuario:usuarios[i].codigo_usuario},function(data){
						if(data[0].penalizado=='Libre'){
							reservaService.penalizar(data[0],function(data){
							})
						}
					})			
				}
			})



			me.ver = function(index){
				me.pos=index;
				me.newBook=JSON.parse(JSON.stringify(me.reservas[index]));
	        	me.imagen='Books/'+me.newBook.portada_l;
				$scope.mostrar = false;
				$scope.mostrar_lista = true;
				me.reserva = me.reservas[index];
				console.log(me.reserva);
				me.pres=false;
				me.reser=true;
			}


			me.doom = 0;


			me.see = function(pos){
				me.doom = pos;
				me.newBook=JSON.parse(JSON.stringify(me.prestamo[pos]));
		        me.imagen='Books/'+me.newBook.portada_l;

				$scope.mostrar = false;
				$scope.mostrar_lista = true;
				me.prestamos = me.prestamo[pos];
				console.log(me.prestamos);
				me.pres=true;
				me.reser=false;
			}
			console.log($filter('date')(new Date(), "yyyy-MM-dd 21:00:00"));

			me.Prestar = function(){
				if(me.reserva.lugar_reserva == 'sala'){
					me.prestando={
						codigo_prestamo:me.reserva.codigo_reserva,
						codigo_libro:me.reserva.codigo_libro,
						codigo_usuario:me.reserva.codigo_usuario,
						fecha_prestada:$filter('date')(new Date(), "yyyy-MM-dd HH:mm:ss"),
						fecha_limite:$filter('date')(new Date(), "yyyy-MM-dd 21:00:00")
					}
					reservaService.prestando(me.prestando,function(data){
			           	me.reservas.splice(me.pos,1);
		        	})
				}else{
					me.prestando={
						codigo_prestamo:me.reserva.codigo_reserva,
						codigo_libro:me.reserva.codigo_libro,
						codigo_usuario:me.reserva.codigo_usuario,
						fecha_prestada:$filter('date')(new Date(), "yyyy-MM-dd HH:mm:ss"),
						fecha_limite:me.futureDate()
					}
					reservaService.prestando(me.prestando,function(data){
			           	me.reservas.splice(me.pos,1);
		        	})
				}
	        	me.cancelar();
			}

			me.futureDate = function(){
				var dateFuture = new Date();

				var dayOfMonth = dateFuture.getDate();
				dateFuture.setDate(dayOfMonth +2);
				return $filter('date')(dateFuture, "yyyy-MM-dd HH:mm:ss");
			}
			me.Devolver = function(){
				me.prestamos.fecha_limite=$filter('date')(me.prestamos.fecha_limite, "yyyy-MM-dd HH:mm:ss");
				PrestamoResource.save(me.prestamos,function(data){
				})
				PrestamoResource.remove({codigo : me.prestamos.codigo_prestamo,libro : me.prestamos.codigo_libro},function(data){
				})
				if(me.prestamos.cantidad_l == 0){
					PrestamoResource.get({codigo:me.prestamos.codigo_libro},function(data){
						console.log(data);
						for(var a = 0 ; a<data.length;a++){
							PrestamoResource.notificaciones(data[a],function(data){
								console.log(data);

							})
						}
					})			
				}
				me.prestamo.splice(me.doom,1);
				me.cancelar();
			}
			me.cancelar = function(){
				$scope.mostrar = true;
				$scope.mostrar_lista = false;
				me.pres=false;
				me.reser=false;
			}



	}
}());
