const resources = [
    "iron",
    "copper",
    "fields",
    "animals",
    "gems",
    "magic"
];

// var res = {
//     name = "animal",
//     subtype = ["sheeps","pigs","cows","hippos","horses","ponies"]
// }

class Region{
    constructor(){
        this.resources = this.getRandomResource();
    }
    getRandomResource(){
        let resArray = [];
        let howManyRes = Math.floor(Math.random() * (resources.length -1) + 1);
        for(let i = 0; i < howManyRes; i++){
            let maxR = resources.length;
            let r = Math.floor(Math.random() * maxR);
            if(!resArray.includes(r)){
                resArray.push(resources[r]);
            } else {
                i--;
            }
            
        }
        return resArray;
    }
}

for(var i=0; i < 5; i++){
    var a = new Region();
    console.log(a.resources);
}