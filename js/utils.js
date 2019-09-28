'use strict';

window.getRandomInteger = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

window.getRandomElement = function (arr) {
  return arr[window.getRandomInteger(0, arr.length - 1)];
};
