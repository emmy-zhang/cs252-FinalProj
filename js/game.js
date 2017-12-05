/* Game namespace */
var game = {
  // an object where to store game information
  data: {
    // score
    scores: {
      first: 0,
      second: 0
    }
  },

  // Run on page load.
  "onload": function () {
    // Initialize the video.
    // if (!me.video.init(640, 480, {wrapper : "screen", scale : "auto", scaleMethod : "flex-width"})) {
    if (!me.video.init(640, 480, { wrapper: "screen", scale: "auto", scaleMethod: "flex-width" })) {
      alert("Your browser does not support HTML5 canvas.");
      return;
    }

    // Initialize the audio.
    me.audio.init("mp3,ogg");

    // set and load all resources.
    // (this will also automatically switch to the loading screen)
    me.loader.preload(game.resources, this.loaded.bind(this));
  },

  // Run on game resources loaded.
  "loaded": function () {
    // set the "Play/Ingame" Screen Object
    me.state.set(me.state.MENU, new game.TitleScreen());
    me.state.set(me.state.PLAY, new game.PlayScreen());

    // register our player entity in the object pool
    me.pool.register("player1", game.PlayerEntity);
    me.pool.register("player2", game.Player2Entity);
    // me.pool.register("CoinEntity", game.CoinEntity);
    // me.pool.register("EnemyEntity", game.EnemyEntity);

    // enable the keyboard for player 1
    me.input.bindKey(me.input.KEY.A, "left1");
    me.input.bindKey(me.input.KEY.D, "right1");
    me.input.bindKey(me.input.KEY.W, "jump1", true);

    // enable the keyboard for player 2
    me.input.bindKey(me.input.KEY.LEFT, "left2");
    me.input.bindKey(me.input.KEY.RIGHT, "right2");
    me.input.bindKey(me.input.KEY.UP, "jump2", true);

    // start the game
    // me.state.change(me.state.PLAY);
    me.state.change(me.state.MENU);
  }
};
