function setupMainMenu() {
  gameManager.tutorialImage = loadImage("./assets/tutorial_image.png");
  const floatAnimation = Animate.getAnimation(
    Animate.move,
    {
      func: Animate.sine,
      funcArgs: {
        a: 5,
        b: 0.1,
        c: 0,
        d: 0,
      },
    },
    ["y"]
  );
  const dif = {
    position: { y: 0 },
  };
  gameManager.addState("menu", (manager) => {
    background(254, 0, 0);
    push();
    textAlign(CENTER, CENTER);
    fill(255);
    textSize(UNIT_SIZE * 0.4);
    text(
      "SAINDO DO BURACO",
      0,
      height / 2 - UNIT_SIZE * 0.7,
      width,
      UNIT_SIZE * 1
    );
    textSize(UNIT_SIZE / 4);
    text("toque/clique para jogar!", width / 2, height / 2 + UNIT_SIZE * 2);
    imageMode(CENTER, CENTER);
    noStroke();
    background("#e00000");
    image(
      gameManager.menuImage,
      width / 2,
      height / 2,
      width,
      (width * gameManager.menuImage.height) / gameManager.menuImage.width
    );
    pop();
    if (mouseIsPressed) {
      manager.setCurrentState("instrucoes");
      manager.addEvent("mostrando instrucoes", 400);
    }
  });

  gameManager.addState("win", (manager) => {
    background(254, 0, 0);
    push();
    textAlign(CENTER, CENTER);
    fill(255);
    textSize(UNIT_SIZE * 0.4);
    text(
      "Parabéns por ter realizado mais uma entrega!\nInfelizmente essa cidade não deixa o motoca nem descansar...\nBora pra próxima",
      0,
      height / 2 - UNIT_SIZE * 3,
      width,
      UNIT_SIZE * 4
    );
    textSize(UNIT_SIZE / 4);
    text(
      "toque/clique para começar novamente!",
      width / 2,
      height / 2 + UNIT_SIZE * 2
    );
    imageMode(CENTER, CENTER);
    noStroke();
    background("#e00000");
    image(
      gameManager.winImage,
      width / 2,
      height / 2,
      width,
      (width * gameManager.winImage.height) / gameManager.winImage.width
    );
    pop();
    if (mouseIsPressed && !manager.hasEvent("won game")) {
      manager.reset();
      manager.setCurrentState("game");
    }
  });

  gameManager.addState("instrucoes", (manager) => {
    background(254, 0, 0);
    push();
    textAlign(CENTER, CENTER);
    fill(255);
    textSize(UNIT_SIZE * 0.4);
    text(
      "Experimente o cotidiano de um entregador em sua moto tendo que fugir dos buracos de São Paulo. Desvie de 50 buracos para chegar no endereço da sua próxima entrega.",
      0,
      height / 2 - UNIT_SIZE * 6,
      width,
      UNIT_SIZE * 8
    );

    imageMode(CENTER);

    floatAnimation.apply(dif);
    image(
      gameManager.tutorialImage,
      width / 2,
      height * 0.7 + dif.position.y,
      UNIT_SIZE * 2,
      UNIT_SIZE * 2
    );

    imageMode(CENTER, CENTER);
    noStroke();
    background("#e00000");
    image(
      gameManager.instrucoes,
      width / 2,
      height / 2,
      width,
      (width * gameManager.instrucoes.height) / gameManager.instrucoes.width
    );
    pop();
    if (
      (mouseIsPressed &&
        manager.getEventDuration("mostrando instrucoes") < 360) ||
      !manager.hasEvent("mostrando instrucoes")
    )
      manager.setCurrentState("game");
  });

  gameManager.addState("lose", (manager) => {
    noStroke();
    background("#e00000");
    push();
    textAlign(CENTER, CENTER);
    fill(255);
    textSize(UNIT_SIZE * 0.4);
    text(
      "Tu caiu no buraco, tal qual milhares de outros trabalhadores em São Paulo.",
      0,
      height / 2 - UNIT_SIZE * 3,
      width,
      UNIT_SIZE * 3
    );

    text(
      "Mas não se preocupe, o prefeito anunciou que vai tirar dinheiro da moradia pra tapar buraco.",
      0,
      height / 2,
      width,
      UNIT_SIZE * 3
    );

    textSize(UNIT_SIZE * 0.3);
    text(
      "toque/clique para tentar novamente",
      0,
      height / 2 + UNIT_SIZE * 3,
      width,
      UNIT_SIZE
    );

    imageMode(CENTER, CENTER);
    noStroke();
    background(0);
    image(
      gameManager.loseImage,
      width / 2,
      height / 2,
      width,
      (width * gameManager.loseImage.height) / gameManager.loseImage.width
    );

    pop();
    if (mouseIsPressed) {
      manager.reset();
      manager.setCurrentState("game");
    }
  });
}
