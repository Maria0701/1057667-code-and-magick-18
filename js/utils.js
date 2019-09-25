'use strict';

var getRandomInteger = function randomInteger(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

var getRandomElement = function (arr) {
  return getRandomInteger(0, arr.length - 1);
};
