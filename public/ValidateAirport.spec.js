describe("myValidateAirportCode", function() {

  beforeEach( function(){
    module('myApp')
  });

  beforeEach(inject(function($compile, $rootScope){
    $scope = $rootScope;
    var element = angular.element(
      '<form name="form"><input type="text" name="leaving_from" data-ng-model="leavingFrom" data-my-validate-airport-code></form>'
    );
    $scope.model = { leavingFrom: null};
    $compile(element)($scope);
    $scope.$digest();
    form = $scope.form;
  }));

  it('should be valid initially', function() {
      expect(form.leaving_from.$valid).toBe(true);
  });

  it('should be invalid when user enters an airport that starts with a different letter than a or A', function(){
    form.leaving_from.$setViewValue('SLC');
    expect(form.leaving_from.$valid).toBe(false);
  });

  it('should contain invalidAiportCode when user enters an airport that starts with a different letter than a or A', function(){
    form.leaving_from.$setViewValue('SLC');
    expect(form.leaving_from.$error.invalidAiportCode).toBeDefined();
  });

  it('should not contain invalidAiportCode when user enters an airport that starts with letter than a or A', function(){
    form.leaving_from.$setViewValue('ALC');
    expect(form.leaving_from.$error.invalidAiportCode).toBeFalsy();
  });

});