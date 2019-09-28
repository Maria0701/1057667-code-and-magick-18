'use strict';

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

var onPopupEscPressHandler = function (evt) {
  if (evt.keyCode === ESCAPE_BUTTON) {
    closePopupHandler();
  }
};

var openPopupHandler = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPressHandler);
};

var closePopupHandler = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPressHandler);
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
  wizardCoat.style.fill = window.getRandomElement(WIZARD_COAT);
});

var wizardEyes = setup.querySelector('.setup-wizard .wizard-eyes');

wizardEyes.addEventListener('click', function () {
  wizardEyes.style.fill = window.getRandomElement(WIZARD_EYES);
});

var wizardFireball = setup.querySelector('.setup-fireball-wrap');

wizardFireball.addEventListener('click', function () {
  wizardFireball.style.background = window.getRandomElement(WIZARD_FIREBALL);
});

var userNameInput = setup.querySelector('.setup-user-name');

userNameInput.addEventListener('invalid', function (evt) {
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
    name: window.getRandomElement(WIZARD_NAMES) + ' ' + window.getRandomElement(WIZARD_SURNAMES),
    coatColor: window.getRandomElement(WIZARD_COAT),
    eyesColor: window.getRandomElement(WIZARD_EYES)
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
