(function(){
	'use strict';
	angular.module('booksApp')
		.controller('EstadisticasCtrl',EstadisticasCtrl);

	function EstadisticasCtrl(estadisticaService,$scope){
		var me=this;
		activate();
        // estadistica();
        $scope.meses=[];

        
        $scope.anio=[
        {id:0,mes:'enero',value:false},
        {id:1,mes:'febrero',value:false},
        {id:2,mes:'marzo',value:false},
        {id:3,mes:'abril',value:false},
        {id:4,mes:'mayo',value:false},
        {id:5,mes:'junio',value:false},
        {id:6,mes:'julio',value:false},
        {id:7,mes:'agosto',value:false},
        {id:8,mes:'septiembre',value:false},
        {id:9,mes:'octubre',value:false},
        {id:10,mes:'noviembre',value:false},
        {id:11,mes:'diciembre',value:false}
        ];
		 function activate() {
             setGridsterOptions();
             // getHistoriales();
        }
        // function estadistica(){
        //     for (var i = 0; i < $scope.anio.length; i++) {
        //         $scope.anio[i].value=true;
        //     }
        // }
        $scope.showAll = function(){
            for (var i = 0; i < $scope.anio.length; i++) {
                $scope.anio[i].value=true;
            }
        }



        function setGridsterOptions(){

            me.lcSizeX = 4;
            me.lcSizeY = 2;
        }
        me.selectMonth= function(idx){
            $scope.anio[idx].value=!$scope.anio[idx].value;
            // console.log(me.anio[idx]);
        }
        $scope.showEstadistica= function(){
            console.log($scope.anio);
        }




	}
}());