(function() {
  /**
   * @param url: the path to the image for this sprite
   * @param pos: the path to the image for this sprite
   * @param size: size of the sprite (just one keyframe)
   * @param speed: speed in frames/sec for animating
   * @param frames: an array of frame indexes for animating: [0, 1, 2, 1]
   * @param dir: which direction to move in the sprite map when animating: 'horizontal' (default) or 'vertical'
   * @param once: true to only run the animation once, defaults to false
   * @constructor
   */
  function Sprite(url, pos, size, speed, frames, dir, once) {
    this.pos = pos;
    this.size = size;
    this.speed = typeof speed === 'number'? speed : 0;
    this.frames = frames;
    this._index = 0;
    this.url = url;
    this.dir = dir || 'horizontal';
    this.once = once;
  }

  Sprite.prototype.update = function(dt) {
    this._index += this.speed * dt;
  }
  Sprite.prototype.render = function() {
    var frame;

    if(this.speed > 0) {
      var max = this.frames.length;
      var idx = Math.floor(this._index);
      frame = this.frames[idx % max];

      if(this.once && idx >= max) {
        this.done = true;
        return;
      }
    } else {
      frame = 0;
    }

    var x = this.pos[0];
    var y = this.pos[1];

    if(this.dir == 'vertical') {
      y += frame * this.size[1];
    } else {
      x += frame * this.size[0];
    }

    ctx.drawImage(resources.get(this.url),
    x,y,
    this.size[0],this.size[1],
    0,0,
    this.size[0],this.size[1]
    )
  }
  window.Sprite = Sprite;
})();