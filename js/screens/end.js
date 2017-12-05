game.EndScreen = me.ScreenObject.extend({
  /**
   * action to perform on state change
   */
  onResetEvent: function () {
    // title screen
    this.backgroundImage = new me.Sprite(0, 0, {
      image: me.loader.getImage('end_screen'),
    });
    var backgroundImage = this.backgroundImage

    // position and scale to fit with the viewport size
    backgroundImage.anchorPoint.set(0, 0);
    backgroundImage.scale(me.game.viewport.width / backgroundImage.width, me.game.viewport.height / backgroundImage.height);

    // add to the world container
    me.game.world.addChild(this.backgroundImage, 3);

    // add a new renderable component with the scrolling text
    this.scrollComponent = new (me.Renderable.extend({
      // constructor
      init: function () {
        this._super(me.Renderable, 'init', [0, 0, me.game.viewport.width, me.game.viewport.height]);

        // font for the scrolling text
        this.font = new me.BitmapFont(me.loader.getBinary('PressStart2P'), me.loader.getImage('PressStart2P'));

        let scroller = null
        let scrollerpos = null
        let scrollertween = null

        let winner = null
        let winScore = null
        if (game.data.scores.first > game.data.scores.second) {
          winner = 'first'
          winScore = game.data.scores.first
          scroller = 'BLUE WINS!'
        } else if (game.data.scores.first < game.data.scores.second) {
          winner = 'second'
          winScore = game.data.scores.second
          scroller = 'RED WINS!'
        } else {
          winner = 'tie'
          winScore = game.data.scores.first
          scroller = "IT'S A TIE!"
        }
        scroller += ' '

        $.ajax({
          type: 'GET',
          url: '/leaderboard',
          dataType: 'json',
          async: false
        }).done(function (data) {
          let scores = data.scores.map((x) => { return x.score })
          console.log(scores)
          if (scores.length === 0 || scores[0] < winScore) {
            scroller += "NEW HIGH SCORE: " + winScore + "!"
          } else {
            let highScore = scores[0]
            scroller += "NO HIGH SCORE."
          }
          scrollerpos = 600;
        });

		this.winScore = winScore

        this.scroller = scroller
        this.scrollerpos = 600
        this.scrollertween = new me.Tween(this).to({ scrollerpos: -2200 }, 10000).onComplete(this.scrollover.bind(this)).start();
      },

      // some callback for the tween objects
      scrollover: function () {
        // reset to default value
        this.scrollerpos = 640;
        this.scrollertween.to({ scrollerpos: -2200 }, 10000).onComplete(this.scrollover.bind(this)).start();
      },

      update: function (dt) {
        return true;
      },

      draw: function (renderer) {
        this.font.draw(renderer, "PRESS ENTER TO PLAY AGAIN", 20, 240);
        this.font.draw(renderer, this.scroller, this.scrollerpos, 440);
      },

      onDestroyEvent: function () {
        //just in case
        this.scrollertween.stop();
      }
    }));

    me.game.world.addChild(this.scrollComponent, 4);

    console.log('end screen')

    // change to play state on press Enter or click/tap
    me.input.bindKey(me.input.KEY.ENTER, "enter", true);
    me.input.bindPointer(me.input.pointer.LEFT, me.input.KEY.ENTER);
    this.handler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge) {
      if (action === "enter") {
        // play something on tap / enter
        // this will unlock audio on mobile devices
        me.audio.play("cling");
        me.state.change(me.state.MENU);
      }
    });
  },

  /**
   * action to perform when leaving this screen (state change)
   */
  onDestroyEvent: function () {
	$.ajax({
      type: 'POST',
      url: '/leaderboard',
      data: { score: this.scrollComponent.winScore },
      async: false
    }).done(function (data) { });

    me.game.world.removeChild(this.backgroundImage);
    me.game.world.removeChild(this.scrollComponent);

    me.input.unbindKey(me.input.KEY.ENTER);
    me.input.unbindPointer(me.input.pointer.LEFT);
    me.event.unsubscribe(this.handler);
  }
});
