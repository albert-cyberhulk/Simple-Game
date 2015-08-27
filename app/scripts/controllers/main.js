'use strict';
/**
 * @file main.js
 * controller file that handles services -> model -> view control
 * @author Albert Cyberhulk
 * @date 27.08.2014
 */

app.controllers.controller('MainCtrl', ['$scope', '$timeout', 'Request', '$log', 'Grid',
   function ($scope, $timeout, Request, $log, Grid) {

   $scope.gridData = [];
   $scope.flood = Grid.flood;

   /**
    * @method getGridData
    * gets the data from Backend
    */
   $scope.getGridData = function() {
     return Grid.getDataArray();
   };

   $scope.processData = function() {
     $scope.getGridData().then(function(data) {
       $scope.gridData = data;
       $timeout(function() {
         alert(JSON.strigify(Grid.solve($scope.gridData)));
       }, 1000);
     });
   };

   /**
    * @method ._init_ bootstraps controller
    */
   $scope._init_ = function() {
     $scope.processData();
   };

}]);
