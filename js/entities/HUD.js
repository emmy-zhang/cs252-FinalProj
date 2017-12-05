/**
 * a HUD container and child items
 */

game.HUD = game.HUD || {};


game.HUD.Container = me.Container.extend({
  init: function () {
    // Call the constructor
    this._super(me.Container, 'init');

    // Persistent across level change
    // this.isPersistent = true;
    this.isPersistent = false;

    // Make sure we use screen coordinates
    this.floating = true;

    this.name = "HUD";

    // Add score counters and timer
    this.scoreFirst = new game.HUD.ScoreItem('first', -860, -10, 'left');
    this.scoreSecond = new game.HUD.ScoreItem('second', -10, -10, 'right');
    this.timer = new game.HUD.Timer(-430, -10);

    this.addChild(this.scoreFirst);
    this.addChild(this.scoreSecond);
    this.addChild(this.timer);
  }
});

/**
 * a basic HUD item to display score
 */
game.HUD.ScoreItem = me.Renderable.extend({
  /**
   * constructor
   */
  init: function (name, x, y, align) {

    // call the parent constructor
    // (size does not matter here)
    this._super(me.Renderable, 'init', [x, y, 10, 10]);

    // create the font object
    if (name == 'first') {
      this.font = new me.BitmapFont(me.loader.getBinary('PressStartBlue'), me.loader.getImage('PressStartBlue'));
    } else {
      this.font = new me.BitmapFont(me.loader.getBinary('PressStartRed'), me.loader.getImage('PressStartRed'));
    }

    // font alignment to right, bottom
    this.font.textAlign = align;
    this.font.textBaseline = "bottom";

    // local copy of the global score
    this.name = name;
    this.score = -1;
  },

  /**
   * update function
   */
  update: function () {
    // we don't do anything fancy here, so just
    // return true if the score has been updated
    if (this.score !== game.data.scores[this.name]) {
      this.score = game.data.scores[this.name];
      return true;
    }
    return false;
  },

  /**
   * draw the score
   */
  draw: function (renderer) {
    // draw it baby!
    this.font.draw(renderer, game.data.scores[this.name], me.game.viewport.width + this.pos.x, me.game.viewport.height + this.pos.y);
    // this.font.draw(renderer, game.data.score, me.game.viewport.width + this.pos.x, me.game.viewport.height + this.pos.y);
  }
});

/**
 * Timer HUD
 */
game.HUD.Timer = me.Renderable.extend({
  /**
   * constructor
   */
  init: function (x, y) {

    // call the parent constructor
    // (size does not matter here)
    this._super(me.Renderable, 'init', [x, y, 10, 10]);

    // create the font object
    this.font = new me.BitmapFont(me.loader.getBinary('PressStart2P'), me.loader.getImage('PressStart2P'));

    // font alignment to right, bottom
    this.font.textAlign = 'center';
    this.font.textBaseline = "bottom";
    console.log('fight me')

    // local copy of the global score
    this.now = Date.now()
    this.elapsed = 0
    // this.total = 60
    this.total = 60
  },

  /**
   * update function
   */
  update: function () {
    // we don't do anything fancy here, so just
    // return true if the score has been updated
    let time = Date.now()
    if ((time - this.now) / 1000 > this.elapsed) {
      this.elapsed += 1
      if (this.elapsed == this.total) {
        me.event.publish("timer_end", [{ haha: 'lol' }]);
      }
      return true;
    }
    return false;
  },

  /**
   * draw the score
   */
  draw: function (renderer) {
    // draw it baby!
    this.font.draw(renderer, this.total - this.elapsed, me.game.viewport.width + this.pos.x, me.game.viewport.height + this.pos.y);
    // this.font.draw(renderer, game.data.score, me.game.viewport.width + this.pos.x, me.game.viewport.height + this.pos.y);
  }
});
