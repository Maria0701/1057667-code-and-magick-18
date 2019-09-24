'use strict';

var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_HEIGHT = 270;
var CLOUD_WEIDTH = 420;
var CLOUD_SHADOW = 10;
var CLOUD_COLOR = 'rgba(255, 255, 255)';
var SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
var FONT_SIZE = 16;
var FONT_PADDING_X = 20;
var FONT_PADDING_Y = 20;
var TEXT_COLOR = 'rgb(0, 0, 0)';
var GYSTO_HEIGHT = 150;
var GYSTO_WEIDTH = 40;
var GYSTO_GAP = 50;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WEIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (element) {
  var maxElement = element[0];
  for (var i = 1; i < element.length; i++) {
    if (element[i] > maxElement) {
      maxElement = element[i];
    }
  }
  return maxElement;
};

var randomInteger = function randomInteger(min, max) {
  // случайное число от min до (max+1)
  var random = min + Math.random() * (max + 1 - min);
  return Math.floor(random);
};

var getBlueWithRandomSaturation = function () {
  return ('hsl(240,' + randomInteger(0, 100) + '%, 50% )');
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + CLOUD_SHADOW, CLOUD_Y + CLOUD_SHADOW, SHADOW_COLOR);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_COLOR);

  ctx.fillStyle = TEXT_COLOR;
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', CLOUD_X + FONT_PADDING_X, CLOUD_Y + FONT_PADDING_Y);
  ctx.fillText('Список результатов:', CLOUD_X + FONT_PADDING_X, CLOUD_Y + FONT_PADDING_Y + FONT_SIZE);

  var maxTime = getMaxElement(times);

  // вычисляем коэфициент для высоты столбца
  var gystoHeightCoef = GYSTO_HEIGHT / maxTime;
  // Вычисляем начальную по Х. Для этого собираем сумму столбцов и пробелов между ними, вычитаем их ширины и делим пополам
  var gystoPadding = (CLOUD_WEIDTH - GYSTO_WEIDTH * times.length - GYSTO_WEIDTH * (times.length - 1)) / 2;
  var gystoXUser = CLOUD_X + gystoPadding;
  var gystoYUser = CLOUD_Y + (2 * FONT_PADDING_Y) + (2 * FONT_SIZE);
  for (var j = 0; j < times.length; j++) {
    var gystoHeightUser = times[j] * gystoHeightCoef;

    var userFillStyle = getBlueWithRandomSaturation(); // цвет НЕосновного игрока

    if (names[j] === 'Вы') {
      userFillStyle = 'rgba(255, 0, 0, 1)';
    }

    ctx.fillStyle = userFillStyle;
    ctx.fillRect(gystoXUser + (GYSTO_WEIDTH + GYSTO_GAP) * j, gystoYUser + GYSTO_HEIGHT - gystoHeightUser, GYSTO_WEIDTH, gystoHeightUser);

    ctx.fillStyle = TEXT_COLOR;
    ctx.fillText(names[j], gystoXUser + (GYSTO_WEIDTH + GYSTO_GAP) * j, gystoYUser + GYSTO_HEIGHT + FONT_SIZE);

    ctx.fillStyle = TEXT_COLOR;
    ctx.fillText(Math.round(times[j]), gystoXUser + (GYSTO_WEIDTH + GYSTO_GAP) * j, gystoYUser + GYSTO_HEIGHT - gystoHeightUser - FONT_SIZE);
  }
};
