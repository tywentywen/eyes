let resolution = 100;
let mainGrid =[];
let padding = 50;

function preload(){

}

function setup() {
  createCanvas(700, 700);

  cols = floor(width / resolution);
  rows = floor(height / resolution);

  grid = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let ex = map(i, 0, cols - 1, padding, width - padding);
      let ey = map(j, 0, rows - 1, padding, height - padding);
      grid[i][j] = new Eye(ex, ey, resolution / 3.5);
      //console.log(grid[i][j]);
    }
  }
  mainGrid = grid;
}

function draw() {
  background(255,200,50);
  noStroke();

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      mainGrid[i][j].update(mouseX, mouseY)
      mainGrid[i][j].display();
    }
  }
}

function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

function Eye(tx, ty, ts) {
  this.x = tx;
  this.y = ty;
  this.size = ts;
  this.angle = 0;

  this.update = function(mx, my) {
    this.angle = atan2(my - this.y, mx - this.x);
  };

  this.display = () => {


    let r = resolution / 2;
    stroke(255, 102, 0);
    strokeWeight(floor(r/10));
    strokeCap(ROUND);
    // curve(100, 1000, 200, 350, 500, 350, 600, 1000)
    // curve(100, -300, 200, 350, 500, 350, 600, -300)
    //top eye
    //c is curve hardness
    let c = 3;
    fill(255);
    curve(this.x - (r * c), this.y + (r * c), this.x - r, this.y,
          this.x + (r), this.y, this.x + (r * c), this.y + (r * c));
    //bottom eye
    curve(this.x - (r * c), this.y - (r * c), this.x - r, this.y,
          this.x + (r), this.y, this.x + (r * c), this.y - (r * c));

    push();
    translate(this.x, this.y);
    rotate(this.angle);
    fill(255, 102, 40);
    ellipse(this.size / 4, 0, this.size / 1.5, this.size / 1.5);
    pop();
  };
}
