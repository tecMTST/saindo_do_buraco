class Entity {
  constructor(id, tileset, size, color = { r: 0, g: 0, b: 0, a: 255 }) {
    this.id = id;
    this.tiles = tileset;
    this.position = {};
    this.spriteAnimations = new Map();
    this.currentAnimation = {
      name: "",
      idx: 0,
      sinceLastFrame: 0,
    };
    this.size = size;
    this.rotation = 0;
    this.color = color;
    this.manager = {};
    this.state = "";
    this.collision = undefined;
    this.onColisionFunction = {};
    this.stateMap = new Map();
  }

  reset() {}

  setup() {}

  get currentState() {
    return this.stateMap.get(this.state);
  }

  addState(stateName, func) {
    this.stateMap.set(stateName, func);
  }

  getState(stateName) {
    return this.stateMap.get(stateName);
  }

  addCollision(collision) {
    this.collision = collision;
  }

  setState(newState) {
    this.state = newState;
  }

  setManager(manager) {
    this.manager = manager;
  }

  preload(initialPosition = { x: 0, y: 0 }) {
    this.tiles.preload();
    this.position = createVector(initialPosition.x, initialPosition.y);
  }

  setPosition(point) {
    this.position.x = point.x;
    this.position.y = point.y;
  }

  setSize(size) {
    this.size = size;
  }

  draw() {
    const currentAnimationList = this.spriteAnimations.get(
      this.currentAnimation.name
    ).cycle;
    const currentSprite = currentAnimationList[this.currentAnimation.idx];
    if (currentAnimationList.length > 1) {
      if (this.currentAnimation.sinceLastFrame <= 0) {
        this.currentAnimation.sinceLastFrame = this.spriteAnimations.get(
          this.currentAnimation.name
        ).time;
        this.currentAnimation.idx =
          (this.currentAnimation.idx + 1) % currentAnimationList.length;
      }
      this.currentAnimation.sinceLastFrame--;
    }

    if (this.id === "heart1" && frameCount < 30) console.log(currentSprite);
    push();
    tint(255, this.color.a);
    translate(this.position.x, this.position.y);
    rotate(this.rotation);
    this.tiles.drawTile(currentSprite, 0, 0, this.size, CENTER);
    pop();
  }

  addAnimation(name, cycle, time) {
    this.spriteAnimations.set(name, { cycle, time });
  }

  setCurrentAnimation(name) {
    this.currentAnimation.name = name;
    this.currentAnimation.idx = 0;
    this.currentAnimation.sinceLastFrame = 0;
  }
}
