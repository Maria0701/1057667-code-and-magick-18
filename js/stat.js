'use strict';

var CLOUD_X = 100;//координата по оси х
var CLOUD_Y = 10;//координата по оси у
var CLOUD_HEIGHT = 270;//высота облака
var CLOUD_WEIDTH = 420; //ширина облака
var CLOUD_SHADOW = 10; //тень облака
var CLOUD_COLOR = 'rgba(255, 255, 255)';
var SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
var fontSize = 16; //размер шрифта
var fontStile = 'PT Mono'; //стиль шрифта
var fontPaddingX = 20; //отступ по Х
var fontPaddingY = 20; //отступ по У
var textColor = 'rgb(0, 0, 0)'; //цвет текста
var gystoHeight = 150; //высота гистограммы
var gystoWidth = 40; //ширина гистограммы
var gystoGap = 50; //расстояние между колонками
var userFillStyle = 'rgba(255, 0, 0, 1)'; //цвет основного игрока


window.renderStatistics = function(ctx, names, times) {
  ctx.fillStyle = SHADOW_COLOR;
  ctx.fillRect(CLOUD_X + CLOUD_SHADOW, CLOUD_Y + CLOUD_SHADOW, CLOUD_WEIDTH, CLOUD_HEIGHT);

  ctx.fillStyle = CLOUD_COLOR;
  ctx.fillRect(CLOUD_X, CLOUD_Y, CLOUD_WEIDTH, CLOUD_HEIGHT);

  ctx.fillStyle = textColor;
  ctx.font = String(fontSize) + 'px ' + fontStile;
  ctx.textBaseline = 'hanging';
  ctx.fillText ('Ура вы победили!', CLOUD_X + fontPaddingX, CLOUD_Y + fontPaddingY);
  ctx.fillText ('Список результатов:', CLOUD_X + fontPaddingX, CLOUD_Y + fontPaddingY + fontSize);

  //ищем самое удачное время
  var currentIndex = 0;
  var maxTime = times[currentIndex];
  for (var i = currentIndex + 1; i < times.length; i++) {
    console.log (times[i]);
    if (times[i] > maxTime) {
       maxTime = times[i];
    }
  }
 console.log (maxTime);

  //вычисляем коэфициент для высоты столбца
  var gystoHeightCoef = gystoHeight / maxTime;
  //Вычисляем начальную по Х. Для этого собираем сумму столбцов и пробелов между ними, вычитаем их ширины и делим пополам
  var gystoPadding = (CLOUD_WEIDTH - gystoWidth * times.length -gystoWidth * (times.length-1)) / 2;
  var gystoXUser = CLOUD_X + gystoPadding;
  var gystoYUser = CLOUD_Y + (2 * fontPaddingY) + (2 * fontSize);
  for (var j = 0; j < times.length; j++) {
    var gystoHeightUser = times[j] * gystoHeightCoef;
    console.log (gystoHeightUser);

    if (j > 0) {
    gystoXUser += (gystoWidth + gystoGap);
  }

  if (names[j] !== 'Вы') {
      userFillStyle = 'rgba(65, 104, 225, ' + Math.random() + ' )';
  }

  ctx.fillStyle = userFillStyle;
  ctx.fillRect(gystoXUser, gystoYUser + gystoHeight - gystoHeightUser, gystoWidth, gystoHeightUser);

  ctx.fillStyle = textColor;
  ctx.font = String(fontSize) + 'px ' + fontStile;
  ctx.textBaseline = 'hanging';
  ctx.fillText (names[j], gystoXUser, gystoYUser + gystoHeight + fontSize);

  ctx.fillStyle = textColor;
  ctx.font = String(fontSize) + 'px ' + fontStile;
  ctx.textBaseline = 'hanging';
  ctx.fillText (Math.round(times[j]), gystoXUser, gystoYUser + gystoHeight - gystoHeightUser - fontSize);
  }

};
