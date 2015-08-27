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
         gridClone = this.flood;
         this.flood(gridClone, colors[i]);
         var curIterator = this.getConnectedCount(gridClone);
         if(weight <= curIterator) {
           weight = curIterator;
           choice = colors[i];
         }
       }
       console.log(choice);
       return choice;
     };

     Grid.updateLinkedSquares = function (grid) {
       var size = grid.length;
       for (var i = 0; i < size; i ++) {
         for (var j = 0; j < size; j ++) {
           if (grid[i][j].isLinked) {
             var color = grid[i][j].color;
             var sq = null;

             if (i > 0) {
               sq = grid[i - 1][j];
             }

             if (i < (size - 1)) {
               var down = grid[i + 1][j];
             }

             if (j > 0) {
               var left = grid[i][j - 1];
             }

             if (j < (size - 1)) {
               var right = grid[i][j + 1];
             }

             if(sq && sq.color == color) {
               sq.isLinked = true;
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
       return true;
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
       var colors = Config.Colors, color = null, solution = [];
       color = this.pickBestColor(grid, colors);
       console.log(color);
       return;
       while(!this.solved(grid)){
         color = this.pickBestColor(grid, colors);
         console.log(color);
         grid = this.flood(grid, color);
         solution.push(color);
       }
       return solution;
     }


     return Grid;

   }]);
