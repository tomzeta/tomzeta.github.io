


//data
var tiles;
var map;
var mapPoints = new Array();
var heightSeed = Math.random();
noise.seed(heightSeed);

//variables
var svgWidth = 900;
var svgHeight = 450;
var distanceX = svgWidth / mapWidth;
var distanceY = svgHeight / mapHeight;
var offsetRandom = 4;


var pText = document.getElementById("textToMod");
var generateButton = document.getElementById("genMap");
generateButton.onclick = function(){
    d3.selectAll("svg").remove();
    mapPoints = new Array();
    
    heightSeed = Math.random();
    noise.seed(heightSeed);
    generateMapToDisplay();   
}

generateMapToDisplay();

function generateMapToDisplay() {
  map = new Mappa(mapWidth, mapHeight);
  tiles = map.tileList;

  for (var y = 0; y < mapHeight; y++) {
    for (var x = 0; x < mapWidth; x++) {
      var tile = map.tileList[x + y * mapWidth];

      var pX = x * distanceX;
      var pY = y * distanceY;

      pX = pX + (Math.random() * offsetRandom - offsetRandom / 2);
      pY = pY + (Math.random() * offsetRandom - offsetRandom / 2);
      tile.setRealPos(pX, pY);
      var c = [pX, pY];
      mapPoints.push(c);
    }
  }
genPolygons();

}

// Create svg container

// Prepare voronoi stuff

function genPolygons() {
    var svgContainer = d3
        .select("#svgWrapper")
        .append("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight);
    svgContainer.append("rect")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("fill", tileHeightColorArray[0].color);
    var vor = d3.voronoi().extent([[5, 5], [svgWidth -5, svgHeight -5]]);
    // Create polygons from points[= circles]
    var polygons = vor.polygons(mapPoints);
    var myG = svgContainer.append("g");
    myG
        .selectAll("path")
        .data(polygons)
        .enter()
        .append("path")
        .attr("d", polyToPath)
        .attr("stroke",function (d, i) {
            return getColorOfTile(tiles[i].height);
        })
        .attr("stroke-width", .3)
        .attr("fill", function (d, i) {
            return getColorOfTile(tiles[i].height);
        })
        .on("mouseover", function(d,i) {
            setTileText(i);
            d3.select(this)
            .style("opacity", .5);
            
        })
        .on("mouseout", function(d,i){
            d3.select(this)
            .style("opacity", 1)
        });
    svgContainer.call(d3.zoom()
        .extent([[0,0],[svgWidth/2, svgHeight/2]])
        .scaleExtent([1,4])
        .on("zoom", zoomed)
    );
    function zoomed(){
        myG.attr("transform", d3.event.transform);
    };
    
    // myG.selectAll("circle").data(tiles).enter()
    //   .append("circle")
    //   .attr("cx",function(d){
    //       return d.realPos[0];
    //   })
    //   .attr("cy", function(d){
    //       return d.realPos[1];
    //   })
    //   .attr("r", .5);
}

function setTileText(iteratorNumber){
    
    var myTile = tiles[iteratorNumber];
    pText.innerHTML =   "Pos: (" + myTile.pos[0] + ","+ myTile.pos[1]+") </br>" +
                        "Height: "+ myTile.height + "</br>" +
                        "Temperature: " +myTile.temperature + "</br>" +
                        "Moisture: " + myTile.moisture;
    
}

function polyToPath(polygon) {
  return polygon ? "M" + polygon.join("L") + "Z" : null;
}
