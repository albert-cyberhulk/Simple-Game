'use strict';
/**
 * @file model.js
 * mock data container for the application
 * and for generating response
 * @author Albert Stepanyan
 * @date 27.08.2014
 */

/**
 * @class MockHttpResponseWrapper
 * contains methods and data for Mock Backend dummy data
 */
var MockHttpResponseWrapper = {

  MockData: {
    colors: ['red', 'orange', 'yellow', 'green', 'blue', 'violet'],
  },

  buildGrid: function(size) {
    var grid = [];
    var maxRand = this.MockData.colors.length;
    for(var i=0;i<size;i++){
      grid[i] = [];
      for(var j=0; j < size; j++){
        grid[i][j] = {color:this.MockData.colors[Math.floor(Math.random() * maxRand)], isLinked:false};
      }
    }
    return grid;
  },

  getMockDataColours: function() {
    return this.buildGrid(10);
  },

  getMockDataByID: function() {

  }

};// END OF CLASS
