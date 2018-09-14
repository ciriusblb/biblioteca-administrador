
(function(){
    'use strict';
    angular.module('booksApp')
      .directive('numbersOnly', function () {
            return {
                require: 'ngModel',
                link: function (scope, element, attr, ngModelCtrl) {
                    function fromUser(text) {
                        if (text) {
                            var transformedInput = text.replace(/[^0-9]/g, '');
                            if (transformedInput !== text) {
                                ngModelCtrl.$setViewValue(transformedInput);
                                ngModelCtrl.$render();
                            } 
                            return transformedInput;
                        }
                        return undefined;
                    }            
                    ngModelCtrl.$parsers.push(fromUser);
                    return false;
                }
            };
        });



    angular.module("booksApp")
.directive('lyricsOnly', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            function fromUser(text) {
                if (text) {
                    var transformedInput = text.replace(/[^a-zA-Z]/g, '');
                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    return transformedInput;
                }
                return undefined;
            }            
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
});

}());























// angular.module("booksApp")
// .directive('lyricsOnly', function () {
//     return {
//         require: 'ngModel',
//         link: function (scope, element, attr, ngModelCtrl) {
//             function fromUser(text) {
//                 if (text) {
//                     var transformedInput = text.replace(/[^a-zA-Z]/g, '');
//                     if (transformedInput !== text) {
//                         ngModelCtrl.$setViewValue(transformedInput);
//                         ngModelCtrl.$render();
//                     }
//                     return transformedInput;
//                 }
//                 return undefined;
//             }            
//             ngModelCtrl.$parsers.push(fromUser);
//         }
//     };
// });

// <input type="text" ng-model="vm.formulario.apellido" name="apellido" lyrics-only>


(function(){
	'use strict'
	angular.module('booksApp')
		.directive('saveModels',[function(){
			return {
				controller: ['$parse','$element','$attrs','$scope',function($parse,$element,$attrs,$scope){
					var exp = $parse($attrs.saveModels);

					$element.on('change',function(){

						exp.assign($scope, this.files);
						$scope.$apply();
					});
				}]
			}
		}]);
}());





