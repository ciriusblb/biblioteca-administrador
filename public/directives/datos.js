(function(){
    'use strict';
    angular.module('booksApp')
    .directive("devolverDatos",function(CrudResource,LibroResource,PrestamoResource,reservaService,UploadResource,UsuariosService,DashboardResource){
        return {
            link: function ( scope,element, attr , ngModelCtrl){
                
                reservaService.query(function(data){
                    scope.reservas=data.length;
                    // console.log("numero 2",scope.reservas);
                })




                CrudResource.query(function(data){                 
                    scope.libros=data.length;

                    // console.log("libros cantidad",scope.libros);
                })
            

                DashboardResource.query(function(data){
                // console.log(data);
                scope.dashboard = data.length;
                })


                UsuariosService.query(function(data){               
                    // console.log(data);
                scope.usuarios=data.length;

                })
            }   
        }
    });

}());
