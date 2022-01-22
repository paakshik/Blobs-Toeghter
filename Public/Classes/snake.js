class Snake {
    constructor(x, y, r,dead) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.color1 = 'maroon';
        this.form = '';
        this.dead = dead;
      
    }
    death() {
      //when snake should die
    }
    
    constrain(){
    this.x = constrain(this.x,-width,width)
     this.y = constrain(this.y,-height,height)
    }
    

    draw() {
push();
        fill(this.color1)
        noStroke();

        ellipse(this.x, this.y, this.r)
pop();  
    }
    increaseR(r) {
        this.r = r;
    }
    IsDead(result){
        this.dead = result;
    }
    coords(x, y) {
        this.x = x;
        this.y = y;
    }
    
    collider(body) {
        if (dist(this.x, this.y, body.x, body.y) < (this.r)) {

            return true;
        }
    }
}