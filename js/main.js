//code variables

var mycondition = true;
var heightSeed = Math.random;
var tempSeed = Math.random;
var tileSize;
var grayscaleMap = false;

//sliderVariables
var minPerlinScale = 5;
var maxPerlinScale = 100;
var minOctaves = 1;
var maxOctaves = 6;
var minPowerOf = .5;
var maxPowerOf = 4;
var minAmplitudeMod = 0.1;
var maxAmplitudeMod = 1.5;
//map
var map;
noise.seed(heightSeed);
//generateButton
var generateHeightButton = document.getElementById("genHeightButton");
generateHeightButton.onclick = function() {
  heightSeed = Math.random();
  noise.seed(heightSeed);
  buildMap();
};
var generateTemperatureButton = document.getElementById("tempMapButton");
generateTemperatureButton.onclick = function() {
  // tempSeed = Math.random();
  // noise.seed(tempSeed);
  drawTemperatureMap();
};
//slider initialization

//perlin noise slider
var perlinNoiseModSlider = document.getElementById("sliderNoiseMod");
var perlinNoiseModValue = document.getElementById("perlinNoiseModifierValue");
perlinNoiseModSlider.max = maxPerlinScale;
perlinNoiseModSlider.min = minPerlinScale;
perlinNoiseModSlider.value = perlinNoiseZoom;
perlinNoiseModValue.innerHTML = perlinNoiseModSlider.value;
perlinNoiseModSlider.oninput = function() {
  perlinNoiseModValue.innerHTML = perlinNoiseModSlider.value;
  perlinNoiseZoom = perlinNoiseModSlider.value;
};
perlinNoiseModSlider.onchange = buildMap;

//SetMapSlider("sliderNoiseMod","perlinNoiseModifierValue", minPerlinScale, maxPerlinScale, perlinNoiseZoom,1);

function SetMapSlider(sliderID, valueID, minValue, maxValue, defaultValue, stepValue){
  var sliderObj = document.getElementById(sliderID);
  var labelObj = document.getElementById(valueID);
  sliderObj.min = minValue;
  sliderObj.max = maxValue;
  sliderObj.value = defaultValue;
  sliderObj.step = stepValue;
  labelObj.innerHTML = sliderObj.value;
  sliderObj.oninput = function(){
    labelObj.innerHTML = sliderObj.value;
    defaultValue = sliderObj.value;
  };
  sliderObj.onchange = buildMap;
}
//perlin octaves slider
var octavesSlider = document.getElementById("noiseOctavesSlider");
var octavesSliderValue = document.getElementById("noiseOctavesValue");
octavesSlider.max = maxOctaves;
octavesSlider.min = minOctaves;
octavesSlider.value = octaves;

octavesSliderValue.innerHTML = octavesSlider.value;
octavesSlider.oninput = function() {
  octavesSliderValue.innerHTML = octavesSlider.value;
  octaves = octavesSlider.value;
};
octavesSlider.onchange = buildMap;

//pow slider
var powSlider = document.getElementById("powSlider");
var powValue = document.getElementById("powValue");
powSlider.max = maxPowerOf;
powSlider.min = minPowerOf;
powSlider.step = 0.1;
powSlider.value = powerOf;

powValue.innerHTML = powSlider.value;
powSlider.oninput = function() {
  powValue.innerHTML = powSlider.value;
  powerOf = powSlider.value;
};
powSlider.onchange = buildMap;

//amplitude slider
var amplitudeSlider = document.getElementById("amplitudeSlider");
var amplitudeValue = document.getElementById("amplitudeValue");
amplitudeSlider.max = maxAmplitudeMod;
amplitudeSlider.min = minAmplitudeMod;
amplitudeSlider.step = 0.1;
amplitudeSlider.value = amplitudeModif;

amplitudeValue.innerHTML = amplitudeSlider.value;
amplitudeSlider.oninput = function() {
  amplitudeValue.innerHTML = amplitudeSlider.value;
  amplitudeModif = amplitudeSlider.value;
};
amplitudeSlider.onchange = buildMap;

//#region Canvas width slider
var canvasWidthSlider = document.getElementById("canvasWidthSlider");
var canvasWidthLabel = document.getElementById("canvasWidthLabel");
canvasWidthSlider.max = 600;
canvasWidthSlider.min = 10;
canvasWidthSlider.step = 10;
canvasWidthSlider.value = mapWidth;

canvasWidthLabel.innerHTML = canvasWidthSlider.value;
canvasWidthSlider.oninput = function(){
  canvasWidthLabel.innerHTML = canvasWidthSlider.value;
  mapWidth = canvasWidthSlider.value;
}
canvasWidthSlider.onchange = buildMap;
//#endregion canvas width
//#region Canvas height slider
var canvasHeightSlider = document.getElementById("canvasHeightSlider");
var canvasHeightLabel = document.getElementById("canvasHeightLabel");
canvasHeightSlider.max = 600;
canvasHeightSlider.min = 10;
canvasHeightSlider.step = 10;
canvasHeightSlider.value = mapHeight;

canvasHeightLabel.innerHTML = canvasHeightSlider.value;
canvasHeightSlider.oninput = function(){
  canvasHeightLabel.innerHTML = canvasHeightSlider.value;
  mapHeight = canvasHeightSlider.value;
}
canvasHeightSlider.onchange = buildMap;
// #endregion canvas height slider

//canvas
var heightCanvas = document.getElementById("heightCanvas");
var ctxHeight = heightCanvas.getContext("2d");
var canvasWidth = heightCanvas.width;
var canvasHeight = heightCanvas.height;

var tempCanvas = document.getElementById("tempCanvas");
var ctxTemp = tempCanvas.getContext("2d");
var tempCanvasWidth = tempCanvas.width;
var tempCanvasHeight = tempCanvas.height;

//other ui
var resultsP = document.getElementById("resultMap");

// convert integer to hex;
function dec2hex(dec) {
  return Number(parseInt(dec, 10)).toString(16);
}
function pad(h) {
  //adds leading 0 to single-digit codes
  if (h.length == 1) return "0" + h;
  else return h;
}

function changeTitle() {
  if (mycondition) {
    document.getElementById("titleH1").innerHTML = "Title changed";
    mycondition = false;
  } else {
    document.getElementById("titleH1").innerHTML = "This is my site";
    mycondition = true;
  }
}
function buildMap(){
  ctxHeight.clearRect(0,0,heightCanvas.width, heightCanvas.height);
  map = buildNoiseMap(mapWidth, mapHeight);
  drawHeightMap();
  drawPointOfInterest(map);
  drawTemperatureMap();
}

function drawHeightMap() {
  console.log("something is working");
  sizeWidth = Math.floor(canvasWidth / mapWidth);
  sizeHeight = Math.floor(canvasHeight / mapHeight);
  tileSize = ((sizeWidth < sizeHeight) ? sizeWidth : sizeHeight);
  //resultsP.innerHTML =  map.printMapValues();
    for (var y = 0; y < mapHeight; y++) {
      for (var x = 0; x < mapWidth; x++) {
      drawSquareAt(x, y, map.mapArray[x][y], ctxHeight, tileHeightColorArray);
    }
  }
  //document.write("clicked button");
}
function drawTemperatureMap() {
  sizeWidth = tempCanvasWidth/mapWidth;
  sizeHeight = tempCanvasHeight/mapHeight;
  tileSize = ((sizeWidth < sizeHeight) ? sizeWidth : sizeHeight);
  if(map != null){
    for (var y = 0; y < mapHeight; y++) {
      for (var x = 0; x < mapWidth; x++) {
        drawSquareAt(x, y, map.tempArray[x][y],ctxTemp, tileTemperatureColorArray);
      }
    }
  }
  //document.write("clicked button");
}

function drawSquareAt(x, y, colorValue, ctx, colorArray) {
  //console.log(colorValue);
  ctx.beginPath();
  var color;
  if(grayscaleMap){
    color = "#" +
    pad(dec2hex(colorValue)) +
    pad(dec2hex(colorValue)) +
    pad(dec2hex(colorValue));
  } else {
    // var colorFound = false;
    // for(i = 0; i < colorArray.length && !colorFound; i++){
    //   if(colorValue/255 < colorArray[i].maxHeightValue){
    //     color = colorArray[i].color;
    //     colorFound = true;
    //   }
    // }
    color = getColorOfTile(colorValue);
  }
  
  ctx.fillStyle = color;
  ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
  ctx.stroke();
}
function drawPointOfInterest(map){
  for(var i=0; i < map.pointInterestArray.length; i++){
    var p = map.pointInterestArray[i];
    ctxHeight.beginPath();
    ctxHeight.fillStyle = "red";
    ctxHeight.fillRect(p.x * tileSize, p.y * tileSize, tileSize/2, tileSize/2);
    ctxHeight.stroke();
  }
  // var pointsOfInterest = new Array();
  // for(var i = 0; i < 200; i++){
  //   var point = pickRandomPoints()
  //   pointsOfInterest.push(point);
  //   console.log("Point " + i + ": ("+point.x+","+point.y+").");
  // }
  // var count = 0;
  // for(var i=0; i < pointsOfInterest.length; i++){
  //   var p = pointsOfInterest[i];
  //   var pointHeight = map.mapArray[p.x][p.y];
  //   console.log("point height: "+pointHeight);
  //   if(pointHeight/255 >.47){
  //     count++;
  //     console.log("putting down point: "+ count);
  //     ctxHeight.beginPath();
  //     ctxHeight.fillStyle = "red";
  //     ctxHeight.fillRect(p.x * tileSize, p.y * tileSize, tileSize, tileSize);
  //     ctxHeight.stroke();
  //   }
  // }
}



