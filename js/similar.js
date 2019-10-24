'use strict';
(function () {
  var URL_GET = 'https://js.dump.academy/code-and-magick/data';
  var DEBOUNCE_INTERVAL_MS = 500;
  var coatColor;
  var eyesColor;
  var wizards = [];

  var debounce = function (cb) {
    var lastTimeout = null;
    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL_MS);
    };
  };

  var getRank = function (wizard) {
    var rank = 0;
    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }
    return rank;
  };

  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    }
    if (left < right) {
      return -1;
    }
    return 0;
  };

  var updateWizards = function () {
    window.render(wizards.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    }));
  };

  window.setup.wizard.coatChangeHandler = debounce(function (color) {
    coatColor = color;
    updateWizards();
  });

  window.setup.wizard.eyesChangeHandler = debounce(function (color) {
    eyesColor = color;
    updateWizards();
  });

  document.querySelector('.setup-similar').classList.remove('hidden');

  var successHandler = function (data) {
    wizards = data;
    updateWizards();
  };

  window.backend.load(URL_GET, successHandler, window.utils.loadErrorHahdler);

})();
