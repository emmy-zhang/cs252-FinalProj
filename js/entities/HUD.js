/**
 * a HUD container and child items
 */

game.HUD = game.HUD || {};


game.HUD.Container = me.Container.extend({
  init: function () {
    // call the constructor
    this._super(me.Container, 'init');

    // persistent across level change
    this.isPersistent = true;

    // make sure we use screen coordinates
    this.floating = true;

    // give a name
    this.name = "HUD";

    // add our child score object at the top left corner
    this.addChild(new game.HUD.ScoreItem('first', -860, -10, 'left'));
    this.addChild(new game.HUD.ScoreItem('second', -10, -10, 'right'));
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
