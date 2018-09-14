(function(){                    
  "use strict";
  angular.module("booksApp")                    //modulo principal de la aplicacion
    .controller("CRUDCtrl",crudCtrl);               //controllador de la vista crud

    function crudCtrl(CrudResource,$scope,UploadResource,$timeout,LibroResource,socket){              //injectamos el servicio crudresource,scope,uploadresource
    var me=this;   
    me.imagen="";        

        $scope.newImage = {};
                                                 //creamos el constructor me para enviar como objetos
    $scope.showDiv = false;
    $scope.editBottom=true;
    $scope.watch=true;
    var valor2 = 1;

    me.array=[];

    me.toggleShowDiv = function(){
        $scope.showDiv = !$scope.showDiv;
            $scope.watch = false;
            $scope.watc = true;
             $scope.ocultar_lista=true;
            $scope.save_bottom=false;
            $scope.changes_bottom=true;
            $scope.edit_bottom=true;
            $scope.delete_bottom=true;
            // vm.imagen=""; 
              me.imagen = 'img/libro.png'; 

    }

   

    me.cancel = function(){
        $scope.showDiv = !$scope.showDiv;
            $scope.ocultar_lista=false;
             $scope.watch = true;
                 $scope.watc = false;
             // $scope.watch = tru;
    }
    var x=0;


    me.hola=true;



    CrudResource.query(function(data){                  //llamo al servicion CrudResource y como quiero buscar aplico query / funcion que recuera datos 
    	me.libros=data;
        for (var i = 0; i < me.libros.length; i++) {
            me.array[i]=false;
        }
    })


            socket.on('actualizandoLibros',function(data){
                for (var i = 0; i < me.libros.length; i++) {
                    if(me.libros[i].cantidad_l!=data[i].cantidad_l){
                        console.log("actualizandoLibros");
                        me.libros[i].cantidad_l=data[i].cantidad_l;
                    }
                }
            })
    

        var idx='';


        $scope.photoChanged = function(files){
            if (files != null) {
                var file = files[0];
                // if ($scope.fileReaderSupported && file.type.indexOf('image') > -1) {
                    $timeout(function() {
                        var fileReader = new FileReader();
                        fileReader.readAsDataURL(file);
                        fileReader.onload = function(e) {
                            $timeout(function(){
                                me.imagen = e.target.result;
                                me.cambio=true;
                            });
                        }
                    });
                // }
            }
        };



    me.ver = function(pos){
        idx=pos;
        
        me.newBook=JSON.parse(JSON.stringify(me.libros[pos]));
        me.imagen='Books/'+me.newBook.portada_l;
        console.log("blablabka",me.newBook);

            $scope.showDiv = !$scope.showDiv;
            $scope.ocultar_lista=true;
            $scope.watch = false;
            $scope.watc = true;

            $scope.save_bottom=true;
            $scope.changes_bottom=false;
            $scope.delete_bottom=false;  
    }









    $scope.newImage = {};


    me.newBook={ 
    id_libro:0,                                       //objeto newBook
        codigo_libro:'',
        titulo_l:'',
        autor_l:'',
        descripcion_l:'',
        portada_l:'libros/1/LIBRO003.jpg',
        cantidad_l:'',
        area_l:'',
        editado:0
    }
    


    me.eliminar=function(){


        for (var i = 0; i < me.array.length; i++) {
            if(me.array[i]){
                console.log("eliminar ",me.libros[i].id_libro);
                    CrudResource.remove({id_libro:me.libros[i].id_libro,portada_l:me.libros[i].portada_l},function(data){            
                    // me.newBook=me.libros[idx];
                        console.log(data);
                          // me.libros.splice(idx, 1);
                          toastr.error("Eliminado");
                    })
            }else{
                console.log("no eliminar ",me.libros[i].id_libro);
            }
        }


    }
    me.eliminarUno = function(){
                CrudResource.remove({id_libro:me.newBook.id_libro,portada_l:me.newBook.portada_l},function(data){
                    
        me.newBook=me.libros[idx];
            console.log(data);
              me.libros.splice(idx, 1);
              toastr.error("eliminado");
              me.cancel();
        })
    }


    me.editar=function(){
        console.log(me.newBook);
        me.newBook.editado=me.newBook.editado+1;
        CrudResource.update(me.newBook,function(data){
            console.log(data);
            toastr.success("Libro editado");
            me.libros[idx]=me.newBook;
            me.cancel();

        })
    }
       console.log("este es el scope ",$scope.newImage);
    me.guardar=function(){

        CrudResource.get(function(data){
            console.log(data[0].codigo_libro);
            console.log(data[0].portada_l);
                var cadena = data[0].codigo_libro,
                subCadena = cadena.substring(2, 8);
                subCadena = parseInt(subCadena)+1;
                subCadena = String(subCadena);
                while(subCadena.length<6){
                    subCadena='0'+subCadena;
                }
                me.newBook.codigo_libro='LI'+subCadena;
                console.log("codigo ",me.newBook.codigo_libro); 


                var portada = data[0].portada_l,
                subportada = portada.substring(5, 8);
                subportada = parseInt(subportada)+1;
                subportada = String(subportada);
                while(subportada.length<3){
                    subportada='0'+subportada;
                }
                me.newBook.portada_l='LIBRO'+subportada+'.'+$scope.newImage.image[0].name.split('.')[1];
                console.log("portada ",me.newBook.portada_l);


                console.log("nombre ",$scope.newImage.image[0].name.split('.')[1]);

        // console.log(me.newBook);
        me.newBook.editado=0;
        CrudResource.save(me.newBook,function(result){
            if (result.id_libro) {
                console.log("la nueva imagen",$scope.newImage);

                 UploadResource.save($scope.newImage,function(result){
                   console.log(result);
                });


                 me.newBook.id_libro=result.id_libro;
                me.libros.push(me.newBook);
                me.newBook={};
                me.cancel();
            }else{
                console.log("ciro se la come");
            }

        })
        })



    }


  }
}());