(function () {
   'use strict';
    
    angular
        .module('booksApp')
        .directive('rtLineChartAnio', rtLineChartControl);

    rtLineChartControl.$inject = ['estadisticaService'];
    
    function rtLineChartControl(estadisticaService){

        return {
            link: function (scope,el,attrs) {

                estadisticaService.areas(function(data){
                  console.log(data);
                  var nombre_areas=[];
                  var areas =['Medicina Veterinaria','Matemática','Administración','Obras Literarias','Computación e Informática','Ciencias Políticas','Sociología','Economía','Física','Agronomía y Forestal','Química','Contabilidad','Biología','Ingenierías','Estadística','Enfermería','Historia','Turismo y Hotelería','Medicina','Geografía'];
                  var cantidad =[];
                    for (var i = 0; i < areas.length; i++) {
                        var c=0;
                        for (var j = 0; j < data.length; j++) {
                            if(areas[i]==data[j].nombre_area){
                                cantidad[i]=c++;
                                // if(c==1){
                                //     nombre_areas.push(data[j].nombre_area);
                                // }
                            }
                        }
                    }
                    console.log(nombre_areas);
                    // for (var i = 0; i < 12; i++) {
                    //     if(!cantidad[i]){
                    //         cantidad[i]=0;
                    //     }
                    // }
                    console.log(cantidad);
                    var torta = [['Task', 'Hours per Day']];
                    for (var i = 0; i < areas.length; i++) {
                        torta.push([areas[i], cantidad[i]]);
                    }
                    scope.data = google.visualization.arrayToDataTable(torta);

                        scope.options = {
                          title: 'Los libros mas solicitados',
                          width: 900,
                            height:500,
                        };

                        var chart = new google.visualization.PieChart(el[0]);
                        chart.draw(scope.data, scope.options);


                })
            }
        }
    }
}());