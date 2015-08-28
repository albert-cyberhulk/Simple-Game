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
   $scope.flood = function(curCell) {
     $scope.curColor = curCell.color;
     $scope.gridData = Grid.flood($scope.gridData, curCell.color);
   };

   $scope.reset = function() {
     window.location.reload();
   };

   $scope.solve = function() {
     $scope.solution = Grid.solve($scope.gridData);
   };

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
     });
   };

   /**
    * @method ._init_ bootstraps controller
    */
   $scope._init_ = function() {
     $scope.processData();
   };

}]);
