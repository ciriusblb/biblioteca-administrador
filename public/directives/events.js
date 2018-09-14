(function(){
    'use strict';
    angular.module('booksApp')
    .directive("cleanInput",function($compile){
        return{
            // require: 'ngModel',
            link: function(scope,element,attrs){
                element.bind("click",function(){
                    // alert("hi");
                var inputs = document.querySelectorAll("input[type='text'],textarea,select");

               for(var i = 0; i < inputs.length; i++) {
                    inputs[i].value="";
                }
                // document.getElementById('autor').value=""
        // }
            }); 
            }
        }
    });




    // angular.module('booksApp')
    //     .directive("disableInput",function($compile){
    //     return{
    //         // require: 'ngModel',
    //         link: function(scope,element,attrs){
    //             element.bind("click",function(){
    //                 // alert("hi");

    //                 $("#campo").prop('disabled', true);
    //                  $("#autor").prop('disabled', true);
    //                  $("#descripcion").prop('disabled', true);
    //                  $("#file").prop('disabled', true);
    //                  $("#numero").prop('disabled', true);
    //                  $("# seleccion").prop('disabled', true);

                    
    //            //  var inputs = document.querySelectorAll("input[type='text'],textarea,select");

    //            // for(var i = 0; i < inputs.length; i++) {
    //            //      $("inputs[i]").prop('disabled',true);
    //            //  }
    //             // document.getElementById('autor').value="";

    //     // }
    //         }); 
    //         }
    //     }
    // });

}());






// (function(){
//     'use strict';
//     angular.module('booksApp')
//       .directive('numbersOnly', function () {
//             return {
//                 require: 'ngModel',
//                 link: function (scope, element, attr, ngModelCtrl) {
//                     function fromUser(text) {
//                         if (text) {
//                             var transformedInput = text.replace(/[^0-9]/g, '');
//                             if (transformedInput !== text) {
//                                 ngModelCtrl.$setViewValue(transformedInput);
//                                 ngModelCtrl.$render();
//                             } 
//                             return transformedInput;
//                         }
//                         return undefined;
//                     }            
//                     ngModelCtrl.$parsers.push(fromUser);
//                     return false;
//                 }
//             };
//         });

