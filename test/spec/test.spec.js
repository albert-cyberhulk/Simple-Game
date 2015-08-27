"use strict";
/**
 * @file test.spec.js
 * test file for main controller js file
 * @author Albert Cyberhulk
 * @date 27.08.2015
 */

/**
 * @namespace MainCtrlTest
 * @returns {undefined}
 */
describe('MainCtrl', function () {
   beforeEach(function () {
     module('App');
   });
   var scope;
   var controller;
   var $httpBackend;
   var successCallback;
   var errorCallback;
   var promise;
   beforeEach(inject(function($rootScope, $controller, _$httpBackend_) {
     $httpBackend = _$httpBackend_;
     scope = $rootScope.$new();
     successCallback = jasmine.createSpy();
     errorCallback = jasmine.createSpy();
     controller = $controller('MainCtrl', {
       '$scope': scope
     });
   }));

   afterEach(function() {
     $httpBackend.verifyNoOutstandingExpectation();
     $httpBackend.verifyNoOutstandingRequest();
   });

  it("Should expect MainController to be initialized", function() {
    expect(controller).toBeDefined();
  });

  it("Should expect $scope.gridData to be an empty array at startup", function() {
    expect(scope.gridData.length).toEqual(0);
  });

  it('Returns http requests successfully and resolves the promise', function () {
    $httpBackend.expectGET('/api/grid').respond(200, [MockHttpResponseWrapper.getMockDataColours()]);
    promise = scope.getGridData();
    promise.then(successCallback, errorCallback);
    $httpBackend.flush();
    expect(successCallback).toHaveBeenCalled();
    expect(errorCallback).not.toHaveBeenCalled();
  });

  it('Checks for $scope.gridData to be filled with data',  function() { console.log(MockHttpResponseWrapper.getMockDataColours());
     $httpBackend.expectGET('/api/grid').respond(200, [MockHttpResponseWrapper.getMockDataColours()]);
     promise = scope.getGridData();
     $httpBackend.flush();
     promise.then(function(data) {
       scope.gridData = data;
       expect(scope.gridData.length).toBeGreaterThan(0);
     });
  });

}); // END OF SPECS

/**
 * @namespace ServicesTest
 * @returns {undefined}
 */
describe('AppServices Test ', function(){
   beforeEach(function () {
     module('AppServices');
   });

   it('Should check if Grid service is defined', inject(function(Grid){
     expect(Grid).not.toBeNull();
   }));

   /*it('Should correctly map and reduce topics', inject(function(Stats){
      var words = Stats.getStats(specHelper.specData);
      var word = words[0];
      expect(word.id).toEqual('1751295897__Berlin');
   }));*/

});
