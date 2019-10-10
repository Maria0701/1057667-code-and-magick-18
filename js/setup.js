'use strict';
(function () {
  var ESCAPE_BUTTON = 27;
  var ENTER_BUTTON = 13;
  var WIZARDS_COUNT = 4;
  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var WIZARD_COAT = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYES = ['black', 'red', 'blue', 'yellow', 'green'];
  var WIZARD_FIREBALL = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

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
  });

  var wizardEyes = setup.querySelector('.setup-wizard .wizard-eyes');

  wizardEyes.addEventListener('click', function () {
    var newWizardEyes = window.utils.getRandomElement(WIZARD_EYES);
    wizardEyes.style.fill = newWizardEyes;
    setup.querySelector('input[name="eyes-color"]').value = newWizardEyes;
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

  setup.querySelector('.setup-similar').classList.remove('hidden');

  var generateWizardWithRandomOptions = function () {
    return {
      name: window.utils.getRandomElement(WIZARD_NAMES) + ' ' + window.utils.getRandomElement(WIZARD_SURNAMES),
      coatColor: window.utils.getRandomElement(WIZARD_COAT),
      eyesColor: window.utils.getRandomElement(WIZARD_EYES)
    };
  };

  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');


  var createWizardElement = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
  };

  var fragment = document.createDocumentFragment();
  for (var i = 0; i < WIZARDS_COUNT; i++) {
    fragment.appendChild(createWizardElement(generateWizardWithRandomOptions()));
  }
  similarListElement.appendChild(fragment);

  window.setup = {
    setup: setup
  };
})();
