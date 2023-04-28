let UNIT_SIZE = window.innerWidth / 6;
if (window.innerHeight < window.innerWidth)
  UNIT_SIZE = (2 * window.innerHeight) / (3 * 6);
const gameManager = new GameManager(UNIT_SIZE);
setAssetsConfig(gameManager);

// Maps API https://maps.googleapis.com/maps/api/staticmap?center=40.714728,-73.998672&zoom=12&size=400x400&maptype=satellite&key=YOUR_API_KEY

function setup() {
  let canvasWidth = window.innerWidth;
  if (window.innerHeight < window.innerWidth)
    canvasWidth = (2 * window.innerHeight) / 3;
  createCanvas(canvasWidth, window.innerHeight);
  noSmooth();
  setupEntities();
  setupMainMenu();
  frameRate(40);
  textFont(gameManager.font);
}

function preload() {
  preloadEntities();
  nucleoStartup();
  gameManager.preload();
  gameManager.font = loadFont("./assets/VT323-Regular.ttf");
  gameManager.menuImage = loadImage("./assets/titulo.png");
  gameManager.instrucoes = loadImage("./assets/intro.png");
  gameManager.winImage = loadImage("./assets/win.png");
  gameManager.loseImage = loadImage("./assets/lose.png");
}

function draw() {
  gameManager.draw();
}
