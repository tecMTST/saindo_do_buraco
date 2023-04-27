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
    textSize(UNIT_SIZE * 0.7);
    text("SAINDO DO BURACO", width / 2, height / 2 - UNIT_SIZE * 0.7);
    textSize(UNIT_SIZE / 3);
    text("toque/clique para jogar!", width / 2, height / 2 + UNIT_SIZE * 2);
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
    textSize(UNIT_SIZE / 3);
    text(
      "toque/clique para começar novamente!",
      width / 2,
      height / 2 + UNIT_SIZE * 2
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
    textSize(UNIT_SIZE * 0.5);
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

    pop();
    if (
      (mouseIsPressed &&
        manager.getEventDuration("mostrando instrucoes") < 360) ||
      !manager.hasEvent("mostrando instrucoes")
    )
      manager.setCurrentState("game");
  });

  gameManager.addState("lose", (manager) => {
    background(0);
    push();
    textAlign(CENTER, CENTER);
    fill(255);
    textSize(UNIT_SIZE * 0.5);
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

    pop();
    if (mouseIsPressed) {
      manager.reset();
      manager.setCurrentState("game");
    }
  });
}
