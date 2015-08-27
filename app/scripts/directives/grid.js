'use strict';
/**
 * @file grid.js
 * directive for grid cube
 * @author Albert Stepanyan
 * @date 27.08.2014
 */

/**
 * @namespace app.directives
 * @class Grid
 * directive for controlling Grid
 * @param {Object} $log
 * @param {Object} $compile
 */
app.directives.directive("grid", ['$log', '$compile',
  function($log, $compile) {
  return {
      restrict: "AE",
      replace: true,
      scope: {
        tag: "@"
      },
      link: function(scope, element, attrs) {
        console.log(scope.tag);
        var tag = "<h1>Grid loaded</h1>";
        element.html(tag);
        $compile(element.contents())(scope);
      }
  };
}]);
