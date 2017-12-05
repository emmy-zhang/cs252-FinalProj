game.PlayScreen = me.ScreenObject.extend({
  /**
   *  action to perform on state change
   */
  onResetEvent: function () {
    // load a level
    me.levelDirector.loadLevel("arena");
    // reset the score
    game.data.scores = {
      first: 0,
      second: 0
    }

    // Add our HUD to the game world, add it last so that this is on top of the rest.
    // Can also be forced by specifying a "Infinity" z value to the addChild function.
    this.HUD = new game.HUD.Container();
    me.game.world.addChild(this.HUD);

    this.handler = me.event.subscribe('timer_end', function (event) {
      // play something on tap / enter
      // this will unlock audio on mobile devices
      console.log('timer end! event: ' + event)
      me.audio.play("cling");
      me.state.change(me.state.GAME_END);
    });
  },

  /**
   *  action to perform when leaving this screen (state change)
   */
  onDestroyEvent: function () {
    // remove the HUD from the game world
    // me.game.world.removeChild(this.HUD);
    console.log('before', me.game.world.children)
    me.game.world.removeChild(this.HUD);
    for (let i = 0; i < me.game.world.children.length; i++) {
      me.game.world.removeChild(me.game.world.children[i]);
    }
    console.log('after', me.game.world.children)
  }
});
