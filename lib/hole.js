class Hole extends Road {
  static HoleSize = 96;
  static HoleTypes = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
  ];
  static roadWidth = undefined;

  static SMALL;

  constructor(id, tileset, size, scrollSpeed = 1) {
    super(id, tileset, size, scrollSpeed);
    Hole.SMALL = UNIT_SIZE * 1.5;
    this.collisionRadius = Hole.SMALL;
  }

  static randomHoleID() {
    const randomHoleSize = Animate.randint(0, Hole.HoleTypes.length);
    const randomHoleType = Animate.randint(
      0,
      Hole.HoleTypes[randomHoleSize].length
    );
    return Hole.HoleTypes[randomHoleSize][randomHoleType];
  }

  setHoleType(holeID) {
    const holeIDNum = +holeID;
    this.setCurrentAnimation(holeIDNum);
    if (holeIDNum < 3) this.collisionRadius = Hole.SMALL;
    else if (holeIDNum < 6) this.collisionRadius = Hole.SMALL * 2;
    else this.collisionRadius = Hole.SMALL * 3;
    this.size = { width: Hole.SMALL, height: Hole.SMALL };
  }

  static randomPosition(hole) {
    hole.manager.entities.get("car").buracosDesviados += 1;
    const posModifier = 1 + hole.id[hole.id.length - 1];
    return {
      x: Animate.random(-Hole.roadWidth / 3, Hole.roadWidth / 3),
      y: Animate.random(
        -height - UNIT_SIZE * 2 * posModifier,
        -height / 2 - hole.size.height - UNIT_SIZE * 2 * posModifier
      ),
    };
  }

  static randomSize() {
    const r = Animate.random(UNIT_SIZE / 2, 1.5 * UNIT_SIZE);
    return {
      width: r,
      height: r,
    };
  }

  preload() {
    super.preload({ x: 10000, y: 10000 });
  }

  reset() {
    super.reset();
    this.position.y = this.manager.position.y * 3;
  }

  scroll() {
    if (this.stop) return;
    Hole.roadWidth ??= this.manager.entities.get("road0").size.width / 2;
    this.position.y += this.scrollSpeed;
    if (this.position.y - this.size.height / 2 >= height / 2) {
      this.setPosition(Hole.randomPosition(this));
      this.setHoleType(Hole.randomHoleID());
      this.collision.colliders[0].shapeArgs = {
        x: 0,
        y: 0,
        radius: this.collisionRadius / 6,
      };
    }
    if (this.manager.hasEvent(Player.Events.FALL)) this.stop = true;
  }

  static generateHoles(manager) {
    const holeTile = new Tileset({
      imageSource: manager.assetsConfig.buraco.local,
      originalTileWidth: manager.assetsConfig.buraco.largura,
      originalTileHeight: manager.assetsConfig.buraco.altura,
      tilesetColumns: 3,
      tilesetRows: 3,
      canvasTileSize: UNIT_SIZE,
      xZero: 0,
      yZero: 0,
    });
    manager.addCategory("hole");

    manager.HOLE_COUNT = 8;

    Hole.sfx = [
      loadSound("./assets/audio/buraco_1.wav"),
      loadSound("./assets/audio/buraco_2.wav"),
      loadSound("./assets/audio/buraco_3.wav"),
    ];

    for (let i = 0; i < manager.HOLE_COUNT; i++) {
      const holeID = "hole" + i;
      const newHole = new Hole(
        holeID,
        holeTile,
        { width: -1000, height: -1000 },
        manager.SCROLL
      );
      const holeCollision = new Collisions(
        newHole,
        new Set(["car"]),
        new Set(["hole"])
      );
      const holeCollider = new Collider(
        "circle",
        {
          x: 0,
          y: 0,
          radius: 0,
        },
        [{ x: 0, y: 0 }]
      );
      holeCollision.addCollider(holeCollider);
      newHole.addCollision(holeCollision);

      manager.addEntity(newHole, holeID);
      manager.addEntityToCategory("hole", holeID);
      newHole.setPosition({ x: -width * 4, y: -height * 4 });
    }
  }

  static addAnimationsToHole(hole) {
    for (const [idx, size] of ["small", "medium", "large"].entries()) {
      for (const variation of Hole.HoleTypes[idx]) {
        hole.addAnimation(variation, [variation], 0);
      }
    }
    hole.setCurrentAnimation(7);
  }

  static setupHoles(manager) {
    for (let i = 0; i < manager.HOLE_COUNT; i++) {
      const holeID = "hole" + i;
      const hole = manager.entities.get(holeID);
      hole.size = { width: UNIT_SIZE / 3, height: UNIT_SIZE / 3 };
      Hole.addAnimationsToHole(hole);
    }
  }
}

class Obstacle extends Road {
  static OBJECTS = [1, 2, 3, 4, 8];
  constructor(id, tileset, size, side = 1, scrollSpeed = 1) {
    super(id, tileset, size, scrollSpeed);
    this.side = side;
    this.size = { width: UNIT_SIZE * 1, height: UNIT_SIZE * 1 };
  }

  scroll() {
    if (this.stop) return;
    Obstacle.roadWidth ??= this.manager.entities.get("road0").size.width / 2;
    this.position.y += this.scrollSpeed;
    if (this.position.y - this.size.height / 2 >= height / 2) {
      this.setPosition(Obstacle.randomPosition(this));
      this.setCurrentAnimation(Obstacle.randomObstacleID());
      this.collision.colliders[0].shapeArgs = {
        x: 0,
        y: 0,
        radius: this.size.width / 2,
      };
    }
    if (this.manager.hasEvent(Player.Events.FALL)) this.stop = true;
  }

  static randomObstacleID() {
    return Obstacle.OBJECTS[Animate.randint(0, Obstacle.OBJECTS.length)];
  }

  static randomPosition(obstacle) {
    return {
      x: [-0.8 * Hole.roadWidth, 0.8 * Hole.roadWidth][obstacle.side],
      y: Animate.random(-1 * height, -height / 2 - obstacle.size.height),
    };
  }

  static makeObs(id, side, obsTiles, manager) {
    const newObs = new Obstacle(
      id,
      obsTiles,
      { width: -1000, height: -1000 },
      side,
      manager.SCROLL
    );
    const obsCollision = new Collisions(
      newObs,
      new Set(["car"]),
      new Set(["hole"])
    );
    const obsCollider = new Collider(
      "circle",
      {
        x: 0,
        y: 0,
        radius: 0,
      },
      [{ x: 0, y: 0 }]
    );
    obsCollision.addCollider(obsCollider);
    newObs.addCollision(obsCollision);

    manager.addEntity(newObs, id, 2);
    manager.addEntityToCategory("hole", id);
    newObs.setPosition({ x: 1115, y: 1115 });

    for (const variation of Obstacle.OBJECTS) {
      newObs.addAnimation(variation, [variation], 0);
    }
    newObs.setCurrentAnimation(1);
  }

  preload() {
    super.preload({ x: 10000, y: 10000 });
  }

  static generateObstacles(manager) {
    const obsTiles = new Tileset({
      imageSource: manager.assetsConfig.objetos.local,
      originalTileWidth: manager.assetsConfig.objetos.largura,
      originalTileHeight: manager.assetsConfig.objetos.altura,
      tilesetColumns: 7,
      tilesetRows: 3,
      canvasTileSize: UNIT_SIZE,
      xZero: 0,
      yZero: 0,
    });

    Obstacle.makeObs("obs0", 0, obsTiles, manager);
    Obstacle.makeObs("obs1", 1, obsTiles, manager);
  }
}
