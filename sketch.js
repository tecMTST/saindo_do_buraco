let UNIT_SIZE = window.innerHeight / 10;
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
  frameRate(60);
  textFont(gameManager.font);
}

function preload() {
  preloadEntities();
  nucleoStartup();
  gameManager.preload();
  gameManager.font = loadFont("./assets/VT323-Regular.ttf");
}

function draw() {
  gameManager.draw();
}
