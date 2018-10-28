class bird {
  constructor(x) {
    this.pos = createVector(20, random(20, height - 20));
    this.gravety = 12;
    this.lift = 75
    this.score = 0;
    this.fitness = 0;
    this.colo = [random(255), random(255), random(255)]
    this.brain = new neural_net(5, [10,10], 1);
    if (x) {
      this.brain.weight = copyarr(x);
      this.brain.mutate(mutate);
    }
  }
  update() {
    this.score++;
    //	this.pos.x += this.speed;
    this.pos.y += this.gravety;
    this.pos.y = constrain(this.pos.y, 20, height - 20);
  }
  show() {
    fill(this.colo)
    ellipse(this.pos.x, this.pos.y, 30, 30);
  }
  up() {
    this.pos.y -= this.lift;
  }
}

function mutate(x) {
  if (random(1) < 0.2) {
    let offset = randomGaussian() * 0.5;
    let newx = x + offset;
    return newx;
  } else {
    return x;
  }
}
