class Road extends Entity {
  constructor(id, tileset, size, scrollSpeed = 1) {
    super(id, tileset, size);
    this.scrollSpeed = scrollSpeed;
    this.originalScrollSpeed = scrollSpeed;
    this.stop = false;
  }

  reset() {
    this.stop = false;
    this.scrollSpeed = this.originalScrollSpeed;
  }

  scroll() {
    if (this.stop) return;
    this.position.y += this.scrollSpeed;
    if (this.position.y >= height * 1.5)
      this.position.y =
        this.roadBellow.position.y -
        this.roadBellow.size.height +
        this.scrollSpeed;
    if (this.manager.hasEvent(Player.Events.FALL)) this.stop = true;
    fill(255, 0, 0);
    circle(this.position.x, this.position.y, 10);
  }

  draw() {
    super.draw();
    if (frameCount % 60 === 0) this.scrollSpeed += 0.2;
    this.scroll();
  }
}
