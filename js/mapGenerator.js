// import Tile from "./modules/tile.mjs";

var mapWidth = 160;
var mapHeight = 80;

var numberOfRedPoints = 200;

// var tileArray = new Array(width * height);
var perlinNoiseZoom = 26;
var octaves = 5;
var powerOf = 1.1;
var amplitudeModif = 0.6;

//terrain colors
const _00deepWaterColor = "#131052";
const _01shallowWaterColor = "#155888";
const _02sandColor = "#cfbc3f";
const _03grassColor = "#a5d818";
const _03d = "#226622";
const _04hillsColor = "#4a4a08";
const _05mountainColor = "#4a2a08";
const _07snowColor = "#faffff"

const _veryHotColor = "#ff2222";
const _hotColor = "#bbaa11";
const _temperateColor = "#118811";
const _coldColor = "#88aadd"
const _veryColdColor = "#ffffff"

class Tile{
  constructor(x,y){
    this.pos = [x,y];
    this.realPos = [0,0];
    this.height = 0;
    this.temperature = 0;
    this.moisture = 0;
    this.tileType = null;
  }
  setHeightValue(height){
    this.height = height;
  };
  setTempValue(temperature){
    this.temperature = temperature;
  };
  setRealPos(x,y){
    this.realPos = [x,y];
  };
  setTileType(tileType){
    this.tileType = tileType;
  };
  setMoisture(moist){
    this.moisture = moist;
  }
}
class Mappa{
  constructor(width,height){
    this.width = width;
    this.height = height;
    this.tileList = new Array();
    this.buildMap();
    // console.log(this.tileList[321].pos);
    // var listN = this.getNeighbours(this.tileList[321])
    // console.log(listN);
    // console.log("MAX: " + Math.min.apply(Math, listN.map(function(o){return o.height})));
  }
  buildMap(){
    for(let y=0; y < this.height; y++){
      for(let x=0; x < this.width; x++){
        let heightValue = Math.floor(generateHeight(x,y));
        let tempValue = generateTemperatureValue(x,y);//Math.floor(generateHeight(x,y,perlinNoiseZoom,1)/255 * 60 -10);
        let moistValue = generateMoistureMap(x,y);
        let tileType = getTerrainType(heightValue);
        let tile = new Tile(x,y);
        tile.setHeightValue(heightValue);
        tile.setTempValue(tempValue);
        tile.setMoisture(moistValue);
        tile.setTileType(tileType);
        this.tileList.push(tile);
      }
    }
  }
  getNeighbours(tile){
    var listOfNeighbours = new Array();
    for(let ny = Math.max(0, tile.pos[1] - 1); ny <= Math.min(this.height -1, tile.pos[1] + 1); ny++){
      for(let nx = Math.max(0,tile.pos[0] - 1); nx <= Math.min(this.width -1, tile.pos[0] + 1); nx++){
        if(!(nx == tile.pos[0] && ny == tile.pos[1])){
          listOfNeighbours.push(this.tileList[ny * this.width + nx]);
        }
      }
    }
    return listOfNeighbours;
  }
  createStreamFrom(tile, endHeightValue){
    var streamList = new Array();
    streamList.push(tile);
    var tileHeight = tile.height;
    while(tileHeight > endHeightValue){
      var neighbourList = this.getNeighbours(tile);
      var nextMinLowTile = Math.min.apply(Math, neighbourList.map(function(o){return o.height}))
      if(nextMinLowTile.height <= tileHeight){
        streamList.push(nextMinLowTile);
        tileHeight = nextMinLowTile.height;
      }
    }
  }
}


class TileMap {
  constructor(width, height) {
    // Initializations
    this.width = width;
    this.height = height;
    
    this.mapArray = new Array(width);
    this.tempArray = new Array(width);
    this.pointInterestArray = new Array();
    for (var x = 0; x < this.width; x++) {
      this.mapArray[x] = new Array(height);
      
      this.tempArray[x] = new Array(height);
    }
  }
  // Methods
  printMapValues = function() {
    var valuesString = "";
    for (var y = 0; y < width; y++) {
      for (var x = 0; x < height; x++) {
        valuesString = valuesString + (this.mapArray[x][y] + " ");
      }
      valuesString = valuesString + "<br/>";
    }
    return valuesString;
  };
  numberOfTiles = function() {
    return width * height;
  };
  pickPointsOfInterestPos = function(numberOfPoints){
    var count = 0;
    while(count<numberOfPoints){
      
      var point = pickRandomPoint();
      var mapTile = this.mapArray[point.x][point.y];
      if(mapTile/255 > .42){
        this.pointInterestArray.push(point);
        count++;
      }
    }
  }
}

class TileType{
  constructor(color, maxHeightValue, maxTempValue = 0){
    this.color = color;
    this.maxHeightValue = maxHeightValue;
    this.maxTempValue = maxTempValue;
  }
  isValideTerrainType = function(height, temp) {
    
  }
}

function getTerrainType(height){
  var colorFound = false;
  for(var i = 0; i < tileHeightColorArray.length && !colorFound; i++){
    if(height/255 <= tileHeightColorArray[i].maxHeightValue){
      return tileHeightColorArray[i];
    }
  }
}
const deepWater = new TileType(_00deepWaterColor, .40);
const shalloWater = new TileType(_01shallowWaterColor, .42);
const sand = new TileType(_02sandColor, .44);
const grass = new TileType(_03grassColor, .49);
const tallGrass = new TileType(_03d, .53);
const hills = new TileType(_04hillsColor, .60);
const mountain = new TileType(_05mountainColor, .72);
const snow = new TileType(_07snowColor,1);

const veryHot = new TileType(_veryHotColor, .15);
const hotClimate = new TileType(_hotColor, .48);
const temperateClimate = new TileType(_temperateColor, .52);
const cold = new TileType(_coldColor, .63);
const veryCold = new TileType(_veryColdColor, 1);

var tileHeightColorArray = [deepWater, shalloWater, sand, grass, tallGrass, hills, mountain,snow];
var tileTemperatureColorArray = [veryHot, hotClimate, temperateClimate, cold, veryCold];

function getColorOfTile(height){
  for(var i = 0; i < tileHeightColorArray.length; i++){
    if(height/255 <= tileHeightColorArray[i].maxHeightValue){
      return tileHeightColorArray[i].color;
    }
  }
  console.log("color not found");
  return null;
}
function generateMoistureMap(x,y){
  let value = noise.perlin2(
    (x / perlinNoiseZoom),
    (y / perlinNoiseZoom)
  );
  value = (value + 1) / 2;
  value = 1 - value;
  return value;
}
function generateTemperatureValue(x,y){
  let baseValue = noise.perlin2(
    (x / perlinNoiseZoom),
    (y / perlinNoiseZoom)
  );
  //baseValue = (baseValue + 1) / 2;
  //baseValue = 1 - baseValue;

  let h = mapHeight / 2;
  
  //equator distance
  let distanceFromCenter = Math.abs(y - h);

  let distMod = Math.abs(distanceFromCenter/h);
  distMod = 1 - distMod;
  
  baseValue = (Math.pow(distMod,1.2) + baseValue) / 2;
  return baseValue * 80;
}


function generateHeight(x, y, zoom = perlinNoiseZoom, oct = octaves, amplMod = amplitudeModif, pow = powerOf) {
  var total = 0;
  frequency = 1;
  amplitude = 1;
  maxValue = 0;
  //generate octaves
  for (i = 0; i < oct; i++) {
    value = noise.perlin2(
      frequency * (x / zoom),
      frequency * (y / zoom)
    );
    // clamp value from -1 + 1 to 0_1
    value = (value + 1) / 2;
    total += value * amplitude;
    maxValue += amplitude;
    amplitude = amplitude * amplMod;
    frequency *= 2;
  }
  if(total > maxValue){
    console.log("total > maxValue");
  }
  total = total / maxValue;
  total = Math.pow(total, pow);
  var re = Math.round(Math.abs(total) * 255);


  // border smoothing
  let widthFraq = mapWidth/4;
  let heightFraq = mapHeight/6;
  
  if(x < widthFraq){
    re *= Math.pow(x/(widthFraq),.15);
  }
  if(x > mapWidth - widthFraq){
    a = x - (mapWidth - widthFraq);
    re *= Math.pow((widthFraq - a)/widthFraq,.15);
  }
  // for y intersections are a problem
  if(y < heightFraq){
    re *= Math.pow(y/(heightFraq), .2);
  }
  if(y > mapHeight - heightFraq){
    a = y - (mapHeight - heightFraq);
    re *= Math.pow((heightFraq-a)/heightFraq,.2);
  }
  
  return re;
}
// function that generate the noiseMap
function buildNoiseMap(width, height, zoom = perlinNoiseZoom, oct = octaves) {
  tileMap = new TileMap(width, height);
  perlinNoiseZoom = zoom;
  octaves = oct;
  for (var y = 0; y < height; y++) {
    for (var x = 0; x < width; x++) {
      tileMap.mapArray[x][y] = generateHeight(x, y);
      tileMap.tempArray[x][y] = generateHeight(x,y,perlinNoiseZoom,1);
    }
  }
  tileMap.pickPointsOfInterestPos(numberOfRedPoints);
  return tileMap;
}
//function to pick random points
function pickRandomPoint(){
  var xPos = Math.floor(Math.random() * mapWidth);
  var yPos = Math.floor(Math.random() * mapHeight);
  var point = {x: xPos, y: yPos};
  return point;
}
// transform [0,1] to [-10,50]
function convert01ToTemperature(i){
  return i * 60 -10;
}
