var inc = 0.1;
var scl = 10;
var cols, rows;
var zoff = 0;
var particles = [];
var flowfield = [];
function setup() {
  var canvas = createCanvas(200, 200);
  cols = floor(width / scl);
  rows = floor(height / scl);
  background(255);
  flowfield = new Array(cols * rows);
  for (var i = 0; i < 200; i++) {
    particles[i] = new Particle();
  }

}
function draw() {
  var yoff = 0;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      var index = x + y * cols;
      var angle = noise(xoff, yoff, zoff) * TWO_PI;
      var v = p5.Vector.fromAngle(angle);
      v.setMag(2);
      flowfield[index] = v;
      xoff += inc;
      /*stroke(0);
      strokeWeight(1);
      push();
      translate(x * scl, y * scl);
      rotate(v.heading());
      line(0, 0, scl, 0);

      pop();*/
    }
    yoff += inc;
    zoff += 0.03;
    for (var i = 0; i < particles.length; i++) {
      particles[i].follow(flowfield);
      particles[i].update();
      particles[i].edges();
      particles[i].show();

    }

  }
}
