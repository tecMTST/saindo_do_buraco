class GameManager {
  constructor(unitSize) {
    this.unitSize = unitSize;
    this.entities = new Map();
    this.shownEntities = new Map();
    this.layers = new Map();
    this.rotation = 0;
    this.states = new Map();
    this.currentState = "game";
    this.behaviorFunctions = new Map();
    this.categorizedEntities = new Map();
    this.collisionMapping = new Map();
    this.events = new Map();
    this.availableLayers = [];
  }

  /**
   * Frame duration represents how many full frames the event should last.
   * @date 4/10/2023 - 10:59:30 AM
   *
   * @param {string} eventName
   * @param {number} [framesDuration=2]
   */
  addEvent(eventName, framesDuration = 2) {
    this.events.set(eventName, framesDuration);
  }

  hasEvent(eventName) {
    return this.events.has(eventName);
  }

  getEventDuration(eventName) {
    return this.events.get(eventName);
  }

  removeEvent(eventName) {
    this.events.delete(eventName);
  }

  eventsCountDown() {
    for (const event of this.events.keys()) {
      this.events.set(event, this.events.get(event) - 1);
      if (this.events.get(event) < 0) this.removeEvent(event);
    }
  }

  addCategory(categoryName) {
    this.categorizedEntities.set(categoryName, []);
  }

  getCategory(categoryName) {
    return this.categorizedEntities.get(categoryName);
  }

  addEntityToCategory(categoryName, entityName) {
    this.categorizedEntities
      .get(categoryName)
      .push(this.entities.get(entityName));
  }

  addBehavior(name, func) {
    this.behaviorFunctions.set(name, func);
  }

  addState(stateName, stateFunction) {
    this.states.set(stateName, stateFunction);
  }

  setCurrentState(stateName) {
    this.currentState = stateName;
  }

  get mouseX() {
    return mouseX - this.position.x;
  }

  get mouseY() {
    return mouseY - this.position.y;
  }

  get mouseVector() {
    const mv = createVector(this.mouseX, this.mouseY);
    mv.rotate(this.rotation);
    return mv;
  }

  preload() {
    for (const entity of this.entities.values()) {
      entity.preload();
    }
    this.states.set("game", GameManager.drawEntities);
  }

  setPosition(pos) {
    this.position = createVector(pos.x, pos.y);
  }

  addEntity(entity, id, layer = 1) {
    this.entities.set(id, entity);
    if (!this.layers.has(layer)) this.layers.set(layer, new Map());
    if (this.availableLayers.indexOf(layer) === -1) {
      this.availableLayers.push(layer);
      this.availableLayers.sort();
    }

    this.layers.get(layer).set(id, entity);
    this.shownEntities.set(id, entity);
    entity.setManager(this);

    if (entity.collision !== undefined) {
      for (const id of entity.collision.collisionIDs.values()) {
        if (this.collisionMapping.get(id) === undefined)
          this.collisionMapping.set(id, []);
        this.collisionMapping.get(id).push(entity.collision);
      }
    }
  }

  draw() {
    for (const bf of this.behaviorFunctions.values()) bf(this);
    this.states.get(this.currentState)(this);
    this.eventsCountDown();
  }

  reset() {
    for (const layer of this.availableLayers) {
      for (const entity of this.layers.get(layer).values()) {
        entity.reset();
      }
    }
    this.events = new Map();
  }

  static runCollisions(manager, entity) {
    if (entity.collision !== undefined) {
      for (const collidesWithID of entity.collision.collidesWith.values()) {
        for (const possibleCollision of manager.collisionMapping.get(
          collidesWithID
        )) {
          for (const point of possibleCollision.points()) {
            if (entity.collision.collidesWithPoint(point)) {
              entity.collision.addCollidingEntity(
                possibleCollision.parent.id,
                possibleCollision.parent
              );
              possibleCollision.addCollidingEntity(entity.id, entity);
              break;
            } else {
              entity.collision.removeCollidingEntity(
                possibleCollision.parent.id,
                possibleCollision.parent
              );
              possibleCollision.removeCollidingEntity(entity.id, entity);
            }
          }
        }
      }
    }
  }

  static drawEntities(manager) {
    background(0);
    push();
    translate(manager.position.x, manager.position.y);
    rotate(manager.rotation);
    for (const layer of manager.availableLayers) {
      for (const entity of manager.layers.get(layer).values()) {
        entity.draw();
        GameManager.runCollisions(manager, entity);
      }
    }
    pop();
  }
}
