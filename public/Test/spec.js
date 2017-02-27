
describe("myValidateBirthDate", function() {

  beforeEach( function(){
    module('myApp')
  });

  beforeEach(inject(function($compile, $rootScope){
    $scope = $rootScope;
    var element = angular.element(
      '<form name="form">'
        +'<div my-validate-birth-date data-ng-model="dateOfBirth">'
          + 'Date Of Birth:<select data-ng-model="dateOfBirth.month" required name="monthOfBirth" data-ng-options="month as month for month in months">'
          + '<option value="" selected="">Month</option></select>'
          + '<select data-ng-model="dateOfBirth.day" required name="dayOfBirth" data-ng-options="day as day for day in days">'
          + '<option value="" selected="">Day</option></select>'
          + '<select data-ng-model="dateOfBirth.year" required name="yearOfBirth" data-ng-options="year as year for year in years">'
          + '<option value="" selected="">Year</option></select>'
        +'</div>'
      + '</form>'
    );
    $scope.model = { dateOfBirth: null};
    $compile(element)($scope);
    $scope.$digest();
    form = $scope.form;
  }));

  describe("incompleteDateOfBirth", function(){

      it('should be defined and initially set valid to false', function() {
        expect(form.$error.incompleteDateOfBirth[0].$valid).toBeFalsy();
      });

      it('should be set to invalid if user has only entered day', function(){
        form.monthOfBirth.$setViewValue("2-Feb");
        $scope.$digest();
        expect(form.$error.incompleteDateOfBirth[0].$valid).toBeFalsy();
      });

      it('should be false when user has entered day, month and year', function(){
        form.monthOfBirth.$setViewValue("2-Feb");
        form.dayOfBirth.$setViewValue(16);
        form.yearOfBirth.$setViewValue(1970);
        $scope.$digest();
        expect(form.$error.incompleteDateOfBirth).toBeFalsy();
      });

    });

    describe("invalidDateOfBith", function(){

      it("should be initially undefined", function(){
        expect(form.$error.invalidDateOfBith).not.toBeDefined();
      });

      it("should be invalid when day, month and year results in an invalid combination such as 31 Feb", function(){
        form.monthOfBirth.$setViewValue("2-Feb");
        form.dayOfBirth.$setViewValue(31);
        form.yearOfBirth.$setViewValue(1970);
        $scope.$digest();
        expect(form.$error.invalidDateOfBith[0].$valid).toBeFalsy()
      });

      it("should be false when day, month and year results in an valid combination such as 11 Feb", function(){
        form.monthOfBirth.$setViewValue("2-Feb");
        form.dayOfBirth.$setViewValue(11);
        form.yearOfBirth.$setViewValue(1970);
        $scope.$digest();
        expect(form.$error.invalidDateOfBith).toBeFalsy();
      })

    });

    describe("minorDateOfBirth", function(){

      it("should be initially undefined", function(){
        expect(form.$error.minorDateOfBirth).not.toBeDefined();
      });

      it("should be invalid when day, month and year results in a combination combination where the year difference with current year is lower than 15 such as 1998", function(){
        form.monthOfBirth.$setViewValue("2-Feb");
        form.dayOfBirth.$setViewValue(11);
        form.yearOfBirth.$setViewValue(2001);
        $scope.$digest();
        expect(form.$error.minorDateOfBirth[0].$valid).toBeFalsy();
      });

      it("should be valid when day, month and year results in a combination combination where the year difference with current year is higher than 15 such as 1998", function(){
        form.monthOfBirth.$setViewValue("2-Feb");
        form.dayOfBirth.$setViewValue(11);
        form.yearOfBirth.$setViewValue(1970);
        $scope.$digest();
        expect(form.$error.minorDateOfBirth).toBeFalsy();
      });

    });

  });

var NOT_IMPLEMENTED = undefined;

// load jasmine htmlReporter
(function() {
  var env = jasmine.getEnv();
  env.addReporter(new jasmine.HtmlReporter());
  env.execute();
}());
