export default class Tile{
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