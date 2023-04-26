class Collider {
  static PRIORITY = ["circle", "triangle"];
  static SHAPES = {
    CIRCLE: "circle",
    TRIANGLE: "triangle",
    POINTS: "points",
  };
  constructor(shape, shapeArgs, collisionPoints) {
    if (shape === Collider.SHAPES.CIRCLE)
      this.collisionFunction = Collider.pointCollidesWithCircle;
    else if (shape === Collider.SHAPES.TRIANGLE)
      this.collisionFunction = Collider.pointCollidesWithTriangle;
    else this.collisionFunction = () => {};
    this.shapeArgs = shapeArgs;
    this.collidingEntities = new Map();
    this.collisionPoints = collisionPoints;
    this.parent = undefined;
  }

  setParent(parent) {
    this.parent = parent;
  }

  collidesWithPoint(point) {
    return this.collisionFunction(point, this.shapeArgs, this.parent);
  }

  static pointCollidesWithTriangle(point, { x1, y1, x2, y2, x3, y3 }, parent) {
    x1 += parent.position.x;
    x2 += parent.position.x;
    x3 += parent.position.x;
    y1 += parent.position.y;
    y2 += parent.position.y;
    y3 += parent.position.y;
    const areaOrig = Math.abs((x2 - x1) * (y3 - y1) - (x3 - x1) * (y2 - y1));
    const area1 = Math.abs(
      (x1 - point.x) * (y2 - point.y) - (x2 - point.x) * (y1 - point.y)
    );
    const area2 = Math.abs(
      (x2 - point.x) * (y3 - point.y) - (x3 - point.x) * (y2 - point.y)
    );
    const area3 = Math.abs(
      (x3 - point.x) * (y1 - point.y) - (x1 - point.x) * (y3 - point.y)
    );
    return area1 + area2 + area3 === areaOrig;
  }

  static pointCollidesWithCircle(point, { x, y, radius }, parent) {
    return (
      (point.x - (x + parent.position.x)) ** 2 +
        (point.y - (y + parent.position.y)) ** 2 <=
      radius ** 2
    );
  }
}

class Collisions {
  constructor(parent, collidesWith = new Set(), collisionIDs = new Set()) {
    this.collidesWith = collidesWith;
    this.collisionIDs = collisionIDs;
    this.colliders = [];
    this.collisionPoints = [];
    this.parent = parent;
    this.collidingEntities = new Map();
  }

  addCollidingEntity(name, entity) {
    this.collidingEntities.set(name, entity);
  }

  removeCollidingEntity(name) {
    this.collidingEntities.delete(name);
  }

  get isColliding() {
    return this.collidingEntities.size > 0;
  }

  addCollider(collider) {
    collider.setParent(this.parent);
    this.colliders.push(collider);
    this.collisionPoints.push(...collider.collisionPoints);
  }

  collidesWithPoint(point) {
    for (const collider of this.colliders) {
      if (collider.collidesWithPoint(point)) {
        return true;
      }
    }
    return false;
  }

  *points() {
    for (const point of this.collisionPoints) {
      yield {
        x: point.x + this.parent.position.x,
        y: point.y + this.parent.position.y,
      };
    }
  }
}
