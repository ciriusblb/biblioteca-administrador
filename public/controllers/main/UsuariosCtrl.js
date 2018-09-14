(function(){
	"use strict";
	angular.module("booksApp")
		.controller("UsuariosCtrl",usuariosCtrl);

		function usuariosCtrl($scope,UsuariosService,socket){
		var me=this;
		console.log('UsuariosCtrl');

		UsuariosService.query(function(data){ 
			me.users=data;

    	})
    	me.penalizado = function(index){
    		me.user=me.users[index];
            console.log(me.user);
    		if(me.users[index].penalizado=="Penalizado"){
    			UsuariosService.cambio(me.user,function(data){
                    toastr.success("Usuario Libre");
                    // me.users[index].estado=data;
                    console.log(data);
                    me.users[index].penalizado='Libre';
    				return false;
    			})
    		}
    		else{
	    		UsuariosService.update(me.user,function(data){
                    me.users[index].penalizado='Penalizado';
                    toastr.error("Usuario Penalizado");

	    		})
    		}
    	}

        me.usuarios={
            estado:''
        }
        socket.on('newUsuario',function(data){

            if(me.users.length!=data.length){
                console.log("insertar");
                me.users=data;
            }
        })


        me.ShowAll = function(){
            me.ver=undefined;
            // UsuariosService.query(function(data){
            //     me.users=data;
            // })
        }
        me.ShowFree = function(){
            me.ver='Libre'
           // UsuariosService.Free(function(data){
           //  me.users=data;
           // })
        }

        me.ShowPenalized = function(){
            me.ver='Penalizado'
           // UsuariosService.Penalized(function(data){
           //  me.users=data;
           // })
        }
	}
}());