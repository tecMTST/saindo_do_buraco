function nucleoStartup() {
  const logoTile = new Tileset({
    imageSource: gameManager.assetsConfig.logo.local,
    originalTileWidth: gameManager.assetsConfig.logo.largura,
    originalTileHeight: gameManager.assetsConfig.logo.altura,
    tilesetColumns: 1,
    tilesetRows: 1,
    canvasTileSize: UNIT_SIZE,
    xZero: 0,
    yZero: 0,
  });

  const logoNucleo = new Entity(`logo-nucleo`, logoTile, {
    width: UNIT_SIZE * 2,
    height: UNIT_SIZE * 2,
  });

  logoNucleo.sfx = loadSound("assets/audio/bgm_vinheta.wav");
  logoNucleo.addAnimation("static", [0], 0);
  logoNucleo.setCurrentAnimation("static");

  logoNucleo.preload();

  const fadeOut = Animate.getAnimation(
    Animate.changeColors,
    {
      func: Animate.linear,
      funcArgs: { a: -2, b: 250 },
    },
    ["a"]
  );

  let overAlpha = 255;
  let hasTouched = false;
  let fc = 0;

  gameManager.addState("intro", (manager) => {
    background(0);
    if (mouseIsPressed) hasTouched = true;
    // fadeOut.apply(logoNucleo);
    logoNucleo.setPosition({ x: width / 2, y: height / 2 });
    // if (!hasTouched) return;
    // if (!logoNucleo.sfx.isPlaying()) logoNucleo.sfx.play();
    if (fc++ > 100) manager.setCurrentState("menu");
    logoNucleo.draw();
    push();
    textAlign(CENTER, CENTER);
    textSize(20);
    fill(255);
    text("FRENTE DE GAMES", width / 2, (3 * height) / 4);
    pop();
    background(0, overAlpha);
    overAlpha += -5;
  });
  gameManager.setCurrentState("intro");
}
