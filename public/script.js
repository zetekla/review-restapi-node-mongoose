// Code goes here

myApp = angular.module("myApp", []);

myApp.controller("searchCtrl", function($scope){

  // This is to hold the validation until we submit the form.
  $scope.submitSearch = function(){
    if($scope.searchForm.$valid) {
      console.log("form sent");
    }else{
      // If form is invalid, show errors
      $scope.searchForm.submitted = true;
    }
  }

  // This is to reset the search model and all errors from screen.
  $scope.reset = function(){
    $scope.search = {}
    $scope.searchForm.submitted = false;
  }

});

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

myApp.constant("dataSet", {
  months: ["1-Jan", "2-Feb", "3-Mar", "4-Apr", "5-May", "6-Jun", "7-Jul", "8-Aug", "9-Sep", "10-Oct", "11-Nov", "12-Dec"],
  years: _.range(new Date().getFullYear(), new Date().getFullYear() - 116, -1),
  days: _.range(1, 32)
});

myApp.directive("myValidateBirthDate", function(dataSet){

  var isDateOfBirthComplete = function(dateOfBirth){
    isValidMonth = typeof dateOfBirth.month != 'undefined' && dateOfBirth.month.toString().length > 0 ;
    isValidDay = typeof dateOfBirth.day != 'undefined'  && dateOfBirth.day.toString().length > 0 ;
    isValidYear = typeof dateOfBirth.year != 'undefined' && dateOfBirth.year.toString().length > 0 ;
    return isValidMonth && isValidDay && isValidYear;
  }

  var isDateOfBirthValid = function(dateOfBirth){
    var daysInMonth, month, parsedDateOfBirth, today, yearMonth;
    month = dateOfBirth.month.split("-")[0];
    yearMonth = dateOfBirth.year + "-" + month;
    daysInMonth = moment(yearMonth, "YYYY-MM").daysInMonth();
    parsedDateOfBirth = moment(new Date(dateOfBirth.year, month - 1, dateOfBirth.day));
    today = moment(new Date());
    return dateOfBirth.day <= daysInMonth && parsedDateOfBirth.isBefore(today);
  }

  var isAdult = function(dateOfBirth) {
    var fifteenYearsAgo, momentOfBirth, month, today;
    today = new Date();
    fifteenYearsAgo = today.setFullYear(today.getFullYear() - 15);
    month = dateOfBirth.month.split("-")[0];
    momentOfBirth = moment("" + dateOfBirth.year + "-" + month + "-" + dateOfBirth.day, "YYYY-MM-DD");
    return momentOfBirth.isBefore(fifteenYearsAgo) || momentOfBirth.isSame(fifteenYearsAgo, 'day');
  }


  // requires an isloated model
  return {
   // restrict to an attribute type.
   restrict: 'A',
  // element must have ng-model attribute.
   require: 'ngModel',
   link: function(scope, ele, attrs, ctrl){

      // set the validation to false until user actually changes the model. This equals required for all three elements of the object
      ctrl.$setValidity('incompleteDateOfBirth', false);

      // Constants to initialize where we get months, days and years
      angular.extend(scope, dataSet);

      // Watch if whole model has changed
      scope.$watch(attrs.ngModel, function(newVal){

        if(angular.isDefined(newVal)) {

          dateOfBirth = newVal;
          dateOfBirthComplete = isDateOfBirthComplete(dateOfBirth);

          ctrl.$setValidity('incompleteDateOfBirth', dateOfBirthComplete);

          if(dateOfBirthComplete){
            ctrl.$setValidity("invalidDateOfBith", isDateOfBirthValid(dateOfBirth));
            ctrl.$setValidity("minorDateOfBirth", isAdult(dateOfBirth));
          }

        }

      }, true);


   }
  }
});