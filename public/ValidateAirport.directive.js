(function(){
'strict';
var myApp = angular.module("myApp");
myApp.directive("myValidateAirportCode", function(){
  // requires an isloated model
  return {
   // restrict to an attribute type.
   restrict: 'A',
  // element must have ng-model attribute.
   require: 'ngModel',
   link: function(scope, ele, attrs, ctrl){

      // add a parser that will process each time the value is
      // parsed into the model when the user updates it.
      ctrl.$parsers.unshift(function(value) {
        if(value){
          // test and set the validity after update.
          var valid = value.charAt(0) == 'A' || value.charAt(0) == 'a';
          ctrl.$setValidity('invalidAiportCode', valid);
        }

        // if it's valid, return the value to the model,
        // otherwise return undefined.
        return valid ? value : undefined;
      });

   }
  }
});
})();