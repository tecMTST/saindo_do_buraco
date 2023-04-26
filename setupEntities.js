async function preloadEntities() {
  const car = Player.createPlayer(gameManager);

  const roadTile = new Tileset({
    imageSource: gameManager.assetsConfig.rua.local,
    originalTileWidth: gameManager.assetsConfig.rua.largura,
    originalTileHeight: gameManager.assetsConfig.rua.altura,
    tilesetColumns: 1,
    tilesetRows: 1,
    canvasTileSize: UNIT_SIZE,
    xZero: 0,
    yZero: 0,
  });

  const road0 = new Road(
    "road0",
    roadTile,
    { width: 0, height: 0 },
    UNIT_SIZE / 8
  );

  const road1 = new Road(
    "road1",
    roadTile,
    { width: 0, height: 0 },
    UNIT_SIZE / 8
  );

  const road2 = new Road(
    "road2",
    roadTile,
    { width: 0, height: 0 },
    UNIT_SIZE / 8
  );

  gameManager.addEntity(road0, "road0");
  gameManager.addEntity(road1, "road1");
  gameManager.addEntity(road2, "road2");
  createHoles();
  gameManager.addEntity(car, "car", 2);

  gameManager.addState("reset", (m) => {
    m.reset();
    m.setCurrentState("game");
  });
  gameManager.addBehavior("resetting", (m) => {
    // if (m.hasEvent(Player.Events.FALL)) m.setCurrentState("reset");
  });
}

function createHoles() {
  Hole.generateHoles(gameManager);
}

function setupEntities() {
  gameManager.setPosition({ x: width / 2, y: height / 2 });

  const car = gameManager.entities.get("car");
  car.setup();

  const road0 = gameManager.entities.get("road0");
  road0.size = { width: width, height: height };
  road0.setPosition({ x: 0, y: 0 });
  road0.addAnimation("static", [0], 0);
  road0.setCurrentAnimation("static");

  const road1 = gameManager.entities.get("road1");
  road1.size = { width: width, height: height };
  road1.setPosition({
    x: 0,
    y: road0.position.y - road0.size.height,
  });
  road1.addAnimation("static", [0], 0);
  road1.setCurrentAnimation("static");

  const road2 = gameManager.entities.get("road2");
  road2.size = { width: width, height: height };
  road2.setPosition({
    x: 0,
    y: road1.position.y - road1.size.height,
  });
  road2.addAnimation("static", [0], 0);
  road2.setCurrentAnimation("static");

  road1.roadBellow = road0;

  road2.roadBellow = road1;

  road0.roadBellow = road2;

  Hole.setupHoles(gameManager);
}
