'use strict';
(function () {
  var getRandomInteger = function (min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  };

  var getRandomElement = function (arr) {
    return arr[getRandomInteger(0, arr.length - 1)];
  };

  var createNewElement = function (tag, className, text, style) {
    var newElement = document.createElement(tag);
    newElement.classList.add(className);
    if (style) {
      newElement.setAttribute('style', style);
    }
    newElement.textContent = (text);
    return newElement;
  };

  var loadErrorHahdler = function (message) {
    var mistake = window.utils.createNewElement('div', 'mistake', message, 'position:absolute; top:50%; left: 50%; padding:20px; background:#fff; transform: translate(-50%, -50%);');
    var mistakeClose = window.utils.createNewElement('span', 'mistake__close', 'x', 'position:absolute; top:5px; right: 5px;');
    mistake.appendChild(mistakeClose);
    window.setup.setup.appendChild(mistake);

    var closeMistakeHandler = function () {
      mistake.remove();
    };
    mistakeClose.addEventListener('click', closeMistakeHandler);
  };

  window.utils = {
    getRandomInteger: getRandomInteger,
    getRandomElement: getRandomElement,
    createNewElement: createNewElement,
    loadErrorHahdler: loadErrorHahdler
  };
})();
