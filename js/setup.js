'use strict';
(function () {
  var ESCAPE_BUTTON = 27;
  var ENTER_BUTTON = 13;
  var WIZARD_COAT = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYES = ['black', 'red', 'blue', 'yellow', 'green'];
  var WIZARD_FIREBALL = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var wizard = {
    eyesChangeHandler: function () {},
    coatChangeHandler: function () {}
  };

  var setupOpen = document.querySelector('.setup-open');
  var setup = document.querySelector('.setup');
  var setupClose = setup.querySelector('.setup-close');
  var setupWizardFormName = setup.querySelector('.setup-user-name');

  var onPopupEscPressHandler = function (evt) {
    if (evt.keyCode === ESCAPE_BUTTON) {
      if (setupWizardFormName !== evt.target) {
        closePopupHandler();
      }
    }
  };

  var openPopupHandler = function () {
    setup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPressHandler);
    window.setupTop = setup.offsetTop;
    window.setupLeft = setup.offsetLeft;
  };

  var closePopupHandler = function () {
    setup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPressHandler);
    setup.style.top = window.setupTop + 'px';
    setup.style.left = window.setupLeft + 'px';
  };

  setupOpen.addEventListener('click', function () {
    openPopupHandler();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_BUTTON) {
      openPopupHandler();
    }
  });

  setupClose.addEventListener('click', function () {
    closePopupHandler();
  });

  setupClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_BUTTON) {
      closePopupHandler();
    }
  });

  var wizardCoat = setup.querySelector('.setup-wizard .wizard-coat');

  wizardCoat.addEventListener('click', function () {
    var newWizardCoat = window.utils.getRandomElement(WIZARD_COAT);
    wizardCoat.style.fill = newWizardCoat;
    setup.querySelector('input[name="coat-color"]').value = newWizardCoat;
    wizard.coatChangeHandler(newWizardCoat);
  });

  var wizardEyes = setup.querySelector('.setup-wizard .wizard-eyes');

  wizardEyes.addEventListener('click', function () {
    var newWizardEyes = window.utils.getRandomElement(WIZARD_EYES);
    wizardEyes.style.fill = newWizardEyes;
    setup.querySelector('input[name="eyes-color"]').value = newWizardEyes;
    wizard.eyesChangeHandler(newWizardEyes);
  });

  var wizardFireball = setup.querySelector('.setup-fireball-wrap');

  wizardFireball.addEventListener('click', function () {
    var newWizardFireball = window.utils.getRandomElement(WIZARD_FIREBALL);
    wizardFireball.style.background = newWizardFireball;
    setup.querySelector('input[name="fireball-color"]').value = newWizardFireball;
  });

  var userNameInput = setup.querySelector('.setup-user-name');

  userNameInput.addEventListener('invalid', function () {
    if (userNameInput.validity.tooShort) {
      userNameInput.setCustomValidity('Имя должно состоять не менее чем из двух символов');
    } else if (userNameInput.validity.tooLong) {
      userNameInput.setCustomValidity('Имя не должно быть более 25-ти символов');
    } else if (userNameInput.validity.valueMissing) {
      userNameInput.setCustomValidity('Oбязательное поле');
    } else {
      userNameInput.setCustomValidity('');
    }
  });

  window.setup = {
    setup: setup,
    wizard: wizard
  };

})();
