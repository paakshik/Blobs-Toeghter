class Star {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.color1 = random(1, 255);
    this.color2 = random(1, 255);
    this.color3 = random(1, 255);
  }
  draw() {
    fill(rgb(this.color1, this.color2, this.color3))
    noStroke();
    ellipse(this.x, this.y, this.r);
  }

}