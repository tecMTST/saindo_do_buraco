/**
 * Base Tileset class
 * @date 4/10/2023 - 2:36:46 PM
 *
 * @class Tileset
 * @typedef {Tileset}
 * @property {string} source Image source path. Is converted into p5.Image after preload
 * @property {number} originalTileWidth Width of the tiles in  the original tileset image
 * @property {number} originalTileHeight Width of the tiles in  the original tileset image
 * @property {number} numWid Number of horizontal tiles in the original image
 * @property {number} numHei number of vertical tiles in the original image
 * @property {number} tileSize Size of the tiles in the original image
 * @property {number} [xZero=0]
 * @property {number} [yZero=0]
 */
class Tileset {
  /**
   * Creates an instance of the Tileset class.
   * @date 4/10/2023 - 2:40:28 PM
   *
   * @constructor
   * @param {Object} args
   * @param {string} args.imageSource Source path of the tileset image
   * @param {number} originalTileWidth Width of the tiles in  the original tileset image
   * @param {number} originalTileHeight Width of the tiles in  the original tileset image
   * @param {number} numWid Number of horizontal tiles in the original image
   * @param {number} numHei number of vertical tiles in the original image
   * @param {number} tileSize Size of the tiles in the original image
   * @param {number} [xZero=0]
   * @param {number} [yZero=0]
   */
  constructor(
    args = {
      imageSource: "",
      originalTileWidth: -1,
      originalTileHeight: -1,
      tilesetColumns: -1,
      tilesetRows: -1,
      canvasTileSize: -1,
      xZero: 0,
      yZero: 0,
    }
  ) {
    const {
      imageSource,
      originalTileWidth,
      originalTileHeight,
      tilesetColumns,
      tilesetRows,
      canvasTileSize,
      xZero,
      yZero,
    } = args;
    if (xZero === undefined) xZero = 0;
    if (yZero === undefined) yZero = 0;
    this.source = imageSource;
    this.originalTileWidth = originalTileWidth;
    this.originalTileHeight = originalTileHeight;
    this.numWid = tilesetColumns;
    this.numHei = tilesetRows;
    this.tileSize = canvasTileSize;
    this.xZero = xZero;
    this.yZero = yZero;
  }

  preload() {
    if (typeof this.source === "string") this.source = loadImage(this.source);
  }

  drawTile(n, x, y, size, imageModeString = -1) {
    if (n != -1) {
      let { tileX, tileY } = this.tileNumToPos(n);
      if (imageModeString) imageMode(imageModeString);
      image(
        this.source,
        x,
        y,
        size.width,
        size.height,
        tileX,
        tileY,
        this.originalTileWidth,
        this.originalTileHeight
      );
    }
  }

  tileNumToPos(n) {
    return {
      tileX: (n % this.numWid) * this.originalTileWidth,
      tileY: Math.floor(n / this.numWid) * this.originalTileHeight,
    };
  }

  drawMap(tileMap) {
    for (let y = 0; y < tileMap.length; y++) {
      for (let x = 0; x < tileMap[y].length; x++) {
        this.drawTile(
          tileMap[y][x],
          x * this.tileSize + this.xZero,
          y * this.tileSize + this.yZero,
          this.tileSize
        );
      }
    }
  }
}
