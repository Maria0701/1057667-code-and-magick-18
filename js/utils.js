'use strict';
(function () {
  var getRandomInteger = function (min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  };

  var getRandomElement = function (arr) {
    return arr[getRandomInteger(0, arr.length - 1)];
  };

  window.utils = {
    getRandomInteger: getRandomInteger,
    getRandomElement: getRandomElement
  };
})();
