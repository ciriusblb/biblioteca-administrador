var app = angular.module('booksApp')
app.directive("rtLineChart", function(estadisticaService){
    return function(scope, element, attrs){


        element.bind("click", function(){

                var enero=[];
                var febrero=[];
                var marzo=[];
                var abril=[];
                var mayo=[];
                var junio=[];
                var julio=[];
                var agosto=[];
                var septiembre=[];
                var octubre=[];
                var noviembre=[];
                var diciembre=[];


                var mes=[enero,febrero,marzo,abril,mayo,junio,julio,agosto,septiembre,octubre,noviembre,diciembre];
                
                estadisticaService.query(function(data){
                    for (var i = 0; i < 12; i++) {
                        for (var j = 0; j < data.length; j++) {
                            if((i+1)==(data[j].fecha_salida.split('-'))[1] ){
                                mes[i].push(data[j]);
                            }
                        }
                        
                    }
                    var uno=[];
                    var dos=[];
                    var tres=[];
                    var cuatro=[];
                    var cinco=[];
                    var seis=[];
                    var siete=[];
                    var ocho=[];
                    var nueve=[];
                    var diez=[];
                    var once=[];
                    var doce=[];
                    var dias=[uno,dos,tres,cuatro,cinco,seis,siete,ocho,nueve,diez,once,doce];
                    for (var j = 0;j< 12; j++) {
                        for (var i = 0; i < 30; i++) {
                            var c=1;
                            for (var k = 0; k < mes[j].length; k++) {
                                if((mes[j][k].fecha_salida.split(' '))[0].split('-')[2]==(i+1)){
                                    dias[j][i]=c++;
                                }
                            }
                        }    
                    }
                    for (var i = 0; i < 12; i++) {
                        for (var j = 0; j < 30; j++) {
                            if(!dias[i][j]){
                                dias[i][j]=0;
                            }
                        }
                    }
                    console.log(dias);
                    var data = new google.visualization.DataTable();

                    data.addColumn('number', 'Dias');
                    var indices=[];
                    for (var i = 0; i < scope.anio.length; i++) {
                        if(scope.anio[i].value){
                            indices.push(scope.anio[i].id);
                            data.addColumn('number',  scope.anio[i].mes); 
                        }                    
                    }

                    scope.options = {
                        chart: {
                          title: 'Libros prestados durante el mes',
                          subtitle: 'Estadistica'
                        },
                        width: 1200,
                        height: 500,
                        hAxis: {
                          title: 'Dias'
                        },
                        vAxis: {
                          title: 'Cantidad de Libros Prestados'
                        },
                    };
                    var lineas=[];
                    for (var i = 0; i < 30; i++) { 
                        var hola = [i+1];
                        for (var j= 0; j < indices.length; j++) {
                            hola.push(dias[indices[j]][i]);
                        }
                        lineas.push(hola);
                    }

                    data.addRows(lineas);
                    var chart = new google.charts.Line(document.getElementById('estados'));
                    for (var i = 0; i < scope.anio.length; i++) {
                        if(scope.anio[i].value){
                            $("#"+i).removeClass('active');
                        }
                        scope.anio[i].value=false;
                    }

                    chart.draw(data, google.charts.Line.convertOptions(scope.options));
                });
            
        });
    };
});