'use strict';
/**
 * @file grid.js
 * handles Requests to Backend API
 * maps data operation
 * and business logic for colors
 * @author Albert Cyberhulk
 * @date 27.08.2014
 */

/**
 * @namespace app.services
 * @class Grid
 * Angular factory service HTTP requests
 * @param {Object} $http
 * @param {Object} $log
 * @return {Object}
 */
 app.services.factory('Grid', ['$http', '$log', '$q', 'Config', 'Request',
   function($http, $log, $q, Config, Request) {

     var Grid = {};

     Grid.getConnectedCount = function(grid){
       var counter = 0;
       for(var i=grid.length-1;i>=0;i--){
         for(var j=grid[i].length-1;j>=0;j--){
           if(grid[i][j].isLinked){
             counter++;
           }
         }
       }
       return counter;
     };

     Grid.pickBestColor = function(grid, colors){
       var choice = null, weight = 0, gridClone=null, currentColor = null;
       for(var i = 0; i<colors.length; i++){
         if(colors[i] == currentColor || currentColor == grid[0][0].color){
           continue;
         }
         gridClone = angular.copy(grid);
         gridClone = this.flood(gridClone, colors[i]);
         var curIterator = this.getConnectedCount(gridClone);
         if(weight <= curIterator) {
           weight = curIterator;
           choice = colors[i];
         }
       }
       return choice;
     };

     Grid.updateLinkedSquares = function (grid) {
       var size = grid.length;
       for (var i = 0; i < size; i ++) {
         for (var j = 0; j < size; j ++) {
           if (grid[i][j].isLinked) {
             var color = grid[i][j].color;

             if (i > 0 && grid[i - 1][j].color == color) {
               grid[i - 1][j].isLinked = true;
             }

             if (i < (size - 1) && grid[i + 1][j].color == color) {
               grid[i + 1][j].isLinked = true;
             }

             if (j > 0 && grid[i][j - 1].color == color) {
               grid[i][j - 1].isLinked = true;
             }

             if (j < (size - 1) && grid[i][j + 1].color == color) {
               grid[i][j + 1].isLinked = true;
             }
           }
         }
       }
       return grid;
     };

     Grid.flood = function flood(grid, color) {
       var size = grid.length;
       if (grid[0][0].color == color)
         return grid;

       grid[0][0].color = color;

       var queue = [];
       for (var i = 0; i < size; i++) {
         for (var j = 0; j < size; j++) {
           if (grid[i][j].isLinked) {
             grid[i][j].color = color;
           }
         }
       }

       return this.updateLinkedSquares(grid);
     };

     Grid.solved = function(grid) {
       var size = grid.length;
       var firstColor = grid[0][0].color;
       for (var i = 0; i < size; i ++) {
         for (var j = 0; j < size; j ++) {
           if (grid[i][j].color != firstColor) {
             return false;
           }
         }
       }
       return true;
     };

     /**
      * @method getDataArray
      * requests remote API
      * returns data
      * @returns {Array}
      */
     Grid.getDataArray = function() {
       return Request.internalHttpRequest(Config.RequestUrls.gridDataUrl, 'get');
     };

     Grid.solve = function(grid){
       var colors = ['red', 'orange', 'yellow', 'green', 'blue', 'violet'], color = null, solution = [];
       grid[0][0].isLinked = true
       while(!this.solved(grid)){
         color = this.pickBestColor(grid, colors);
         grid = this.flood(grid, color);
         solution.push(color);
       }
       return solution;
     };


     return Grid;

   }]);
