import TerrainType, {tileHeightColorArray,tileTemperatureColorArray} from "./modules/terrainType.mjs";

var grammar;

const genString = document.getElementById("textP");
const genButton = document.getElementById("textButton");
genButton.onclick = function(){
    // generate 10 city names
    let strn = "";
    for(let i = 0; i < 10; i++){
        strn += grammar.flatten("#origin#") + "</br>";
    }
    genString.innerHTML = strn;
}


const initialRequest = async () => {
    const response = await fetch('http://127.0.0.1:5500/json/test.json');
    const json = await response.json();
    grammar = tracery.createGrammar(json);
}
initialRequest();



