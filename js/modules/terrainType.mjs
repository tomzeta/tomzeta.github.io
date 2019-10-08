export default class TerrainType{
    constructor(color, maxValue){
      this.color = color;
      this.maxValue = maxValue;
    }
  }

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


const deepWater = new TerrainType(_00deepWaterColor, .40);
const shalloWater = new TerrainType(_01shallowWaterColor, .42);
const sand = new TerrainType(_02sandColor, .44);
const grass = new TerrainType(_03grassColor, .53);
const tallGrass = new TerrainType(_03d, .57);
const hills = new TerrainType(_04hillsColor, .63);
const mountain = new TerrainType(_05mountainColor, .72);
const snow = new TerrainType(_07snowColor,1);

const veryHot = new TerrainType(_veryHotColor, .15);
const hotClimate = new TerrainType(_hotColor, .48);
const temperateClimate = new TerrainType(_temperateColor, .52);
const cold = new TerrainType(_coldColor, .63);
const veryCold = new TerrainType(_veryColdColor, 1);

export var tileHeightColorArray = [deepWater, shalloWater, sand, grass, tallGrass, hills, mountain,snow];
export var tileTemperatureColorArray = [veryHot, hotClimate, temperateClimate, cold, veryCold];