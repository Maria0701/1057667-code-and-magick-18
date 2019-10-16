'use strict';
(function () {
  var URL_SEND = 'https://js.dump.academy/code-and-magick';
  var form = window.setup.setup.querySelector('.setup-wizard-form');
  form.addEventListener('submit', function (evt) {
    window.backend.save(URL_SEND, new FormData(form), function () {
      window.setup.setup.classList.add('hidden');
    }, window.utils.loadErrorHahdler);
    evt.preventDefault();
  });
})();
