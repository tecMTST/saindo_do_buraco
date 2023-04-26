class Animate {
  static random(min, max) {
    return Math.random() * (max - min) + min;
  }

  static randint(min, max) {
    return Math.floor(Animate.random(min, max));
  }

  /**
   * Returns an animation caller function.
   * Animations are functions that are applied to the given Entity instance.
   *
   * Animation configuration contains what mathematical function will be used to change the properties of the entity, as well as
   * the parameters for that change function.
   *
   * @date 4/1/2023 - 6:22:02 PM
   *
   * @static
   * @param {Function} animation
   * @param {Object} [animationConfig={ func: () => {}, funcArgs: {} }]
   * @param {Function} animationConfig.func
   * @param {{a: number, b: number, c: number}} animationConfig.funcArgs Function parameters/arguments (a, b, c, d, ...)
   * @param {string[]} options
   * @returns {{apply: (entity)=>{}, reset: ()=>{}, copy: ()=>{}}}
   */
  static getAnimation(
    animation,
    animationConfig = { func: () => {}, funcArgs: {} },
    options = []
  ) {
    let currentFrame = 0;

    return {
      apply: (entity) => {
        currentFrame++;
        animation({
          entity,
          currentFrame,
          animationConfig,
          options,
        });
      },
      reset: () => {
        currentFrame = 0;
      },
      copy: () => Animate.getAnimation(animation, animationConfig, options),
    };
  }

  static sine(x, args) {
    const { a, b, c, d } = args;
    return a * Math.sin(b * x + c) + d;
  }

  static linear(x, args) {
    return x * args.a + args.b;
  }

  static quadratic(x, args) {
    const { a, b, c } = args;
    return a * x * x + b * x + c;
  }

  static turn(entityAnimation) {
    const { func, funcArgs } = entityAnimation.animationConfig;
    const { entity, currentFrame } = entityAnimation;

    entity.rotation = func(currentFrame, funcArgs);
  }

  static stretch(entityAnimation) {
    const { func, funcArgs } = entityAnimation.animationConfig;
    const { entity, currentFrame, options } = entityAnimation;

    for (const side of options)
      entity.size[side] = func(currentFrame, funcArgs);
  }

  static changeColors(entityAnimation) {
    const { func, funcArgs } = entityAnimation.animationConfig;
    const { entity, currentFrame, options } = entityAnimation;

    for (const colorComponent of options)
      entity.color[colorComponent] = func(currentFrame, funcArgs);
  }

  static move(entityAnimation) {
    const { func, funcArgs } = entityAnimation.animationConfig;
    const { entity, currentFrame, options } = entityAnimation;

    for (const direction of options)
      entity.position[direction] = func(currentFrame, funcArgs);
  }
}
