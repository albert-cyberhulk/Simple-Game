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
window.MockHttpResponseWrapper = {

  MockData: {
    colors: ['red', 'orange', 'yellow', 'green', 'blue', 'violet']
  },

  getMockData: function() {
    return this.MockData.colors;
  },

  getMockDataByID: function() {

  }

};// END OF CLASS
