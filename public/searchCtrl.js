myApp = angular.module("myApp", []);

  myApp.controller("searchCtrl", function($scope){

    // This is to hold the validation until we submit the form.
    $scope.submitSearch = function(){
      if($scope.searchForm.$valid) {
        console.log("form sent");
      }else{
        // If for, is invalid, show errors
        $scope.searchForm.submitted = true;
      }
    }

  // This is to reset the search model and all errors from screen.
  $scope.reset = function(){
    $scope.search = {}
    $scope.searchForm.submitted = false;
  }

});