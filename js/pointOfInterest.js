class PointOfInterest{
    constructor(){
        this.position;
        this.name;
    }
}
class Settlement extends PointOfInterest{
    constructor(population){
        super();
        this.population = population;
    }
}




/* 
widthFraq = width/10         //200 / 10 = 20
heightFraq = height/20       //100 / 20 = 5
if{
    x<(widthFraq) ||
    x>(width-(width/8)) ||
    y<(height/16) ||
    y>(height-(height/16))
}
widthFraq // = 25
-
0

x *= (widthFraq-x)/widthFraq



XXYYYYYYXX
XX000000XX
XX000000XX
XXYYYYYYXX



0123EEEEEEEEEEEEEEwidth
1
2
3
4
5

*/