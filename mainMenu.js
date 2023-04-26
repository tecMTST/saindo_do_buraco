function setupMainMenu() {
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
      manager.addEvent("mostrando instrucoes", 300);
    }
  });

  gameManager.addState("win", (manager) => {
    background(254, 0, 0);
    push();
    textAlign(CENTER, CENTER);
    fill(255);
    textSize(UNIT_SIZE * 0.4);
    text(
      "Parabéns por ter realizado mais uma entrega!",
      0,
      height / 2 - UNIT_SIZE * 3,
      width,
      UNIT_SIZE * 4
    );
    text(
      "Infelizmente essa cidade não deixa o motoca nem descansar...",
      0,
      height / 2 - UNIT_SIZE * 2,
      width,
      UNIT_SIZE * 4
    );
    text("Bora pra próxima", width / 2, height / 2 + UNIT_SIZE * 0.8);
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
      height / 2 - UNIT_SIZE * 2,
      width,
      UNIT_SIZE * 4
    );
    pop();
    if (
      (mouseIsPressed &&
        manager.getEventDuration("mostrando instrucoes") < 250) ||
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
