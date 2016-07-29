'use strict';
/**
* @file spriteSheetRunner.js
* directive that handles canvas element of the fame
* @author Albert Stepanyan
* @date 16.06.2014
*/

/**
* @namespace app.directives
*/
angular.module('app.directives')
.directive('gameCanvas', ["Loader", function(Loader) {
  return {
    restrict: "E",
    replace: true,
    scope:  {},
    template: "<canvas width='960' height='400'></canvas>",
    link: function(scope, elem, attrs) {
      var w;
      var h;
      var loader;
      var manifest;
      var sky;
      var grant;
      var ground;
      var hill;
      var hill2;
      drawGame();
      // Creates canvas with loader and assets
      function drawGame() {
        //drawing the game canvas from scratch here
        //In future we can pass stages as param and load indexes from arrays of background elements etc
        if (scope.stage) {
          scope.stage.autoClear = true;
          scope.stage.removeAllChildren();
          scope.stage.update();
        } else {
          scope.stage = new createjs.Stage(elem[0]);
        }
        w = scope.stage.canvas.width;
        h = scope.stage.canvas.height;
        Loader.getLoader().addEventListener("complete", handleComplete);
        Loader.loadAssets();
      }
      function handleComplete() {
        sky = new createjs.Shape();
        sky.graphics.beginBitmapFill(Loader.getResult("sky")).drawRect(0, 0, w, h);
        var groundImg = Loader.getResult("ground");
        ground = new createjs.Shape();
        ground.graphics.beginBitmapFill(groundImg).drawRect(0, 0, w + groundImg.width, groundImg.height);
        ground.tileW = groundImg.width;
        ground.y = h - groundImg.height;
        hill = new createjs.Bitmap(Loader.getResult("hill"));
        hill.setTransform(Math.random() * w, h - hill.image.height * 4 - groundImg.height, 4, 4);
        hill.alpha = 0.5;
        hill2 = new createjs.Bitmap(Loader.getResult("hill2"));
        hill2.setTransform(Math.random() * w, h - hill2.image.height * 3 - groundImg.height, 3, 3);
        var spriteSheet = new createjs.SpriteSheet({
          framerate: 30,
          "images": [Loader.getResult("grant")],
          "frames": {"regX": 82, "height": 292, "count": 64, "regY": 0, "width": 165},
          // define two animations, run (loops, 1.5x speed) and jump (returns to run):
          "animations": {
            "run": [0, 25, "run", 1.5],
            "jump": [26, 63, "run"]
          }
        });
        grant = new createjs.Sprite(spriteSheet, "run");
        grant.y = 35;
        scope.stage.addChild(sky, hill, hill2, ground, grant);
        scope.stage.addEventListener("stagemousedown", handleJumpStart);
        createjs.Ticker.timingMode = createjs.Ticker.RAF;
        createjs.Ticker.addEventListener("tick", tick);
      }
      function handleJumpStart() {
        grant.gotoAndPlay("jump");
      }
      function tick(event) {
        var deltaS = event.delta / 1000;
        var position = grant.x + 150 * deltaS;
        var grantW = grant.getBounds().width * grant.scaleX;
        grant.x = (position >= w + grantW) ? -grantW : position;
        ground.x = (ground.x - deltaS * 150) % ground.tileW;
        hill.x = (hill.x - deltaS * 30);
        if (hill.x + hill.image.width * hill.scaleX <= 0) {
          hill.x = w;
        }
        hill2.x = (hill2.x - deltaS * 45);
        if (hill2.x + hill2.image.width * hill2.scaleX <= 0) {
          hill2.x = w;
        }
        scope.stage.update(event);
      }
    }
  }
}]);
