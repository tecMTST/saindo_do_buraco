class Particle {
  static CIRCLE = "circle";
  static builtins = [Particle.CIRCLE];

  constructor(
    lifeTime = 0,
    relativePosition = { x: 0, y: 0 },
    relativeRotation = 0,
    initialPosition = { x: 0, y: 0 },
    changeFunctions = [],
    size = { width: 0, height: 0 },
    color = { r: 0, g: 0, b: 0, a: 100 },
    image = Particle.CIRCLE
  ) {
    this.lifeTime = lifeTime;
    this.position = { ...initialPosition };
    this.changeFunctions = changeFunctions;
    this.image = image;
    this.size = size;
    this.color = color;
    this.relativePosition = relativePosition;
    this.relativeRotation = relativeRotation;
  }

  addChangeFunction(func) {
    this.changeFunctions.append(func);
  }

  draw() {
    this.lifeTime -= 1;
    for (const animation of this.changeFunctions) animation.apply(this);

    if (this.image === Particle.CIRCLE) {
      const { r, g, b, a } = this.color;
      push();
      translate(this.relativePosition.x, this.relativePosition.y);
      rotate(this.relativeRotation);
      fill(r, g, b, a);
      noStroke();
      circle(this.position.x, this.position.y, this.size.width);
      pop();
    } else {
      image(
        this.image,
        this.position.x,
        this.position.y,
        this.size.width,
        this.size.height
      );
    }
  }
}
