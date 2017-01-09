class Animator {
  static get TILE_DIST() {
    return 70;
  }
  static get DURATION() {
    return this.duration || 350;
  }
  static set DURATION(duration) {
    this.duration = duration;
  }
  constructor(helper) {
    this.helper = helper;
    this._queue = [];
    this._animating = false;
  }
  animate(number, newPos, oldPos) {
    return new Promise(resolve => {
      this._queue.push({
        elementPos: this.helper.solvedPosition(number),
        newPos: newPos,
        oldPos: oldPos,
        resolve: resolve
      });
      this._run();
    });
  }
  _run() {
    if (this._queue.length === 0 || this._animating) {
      return;
    }
    this._animating = true;
    const node = this._queue.shift();
    const [newRow, newCol] = node.newPos;
    const [oldRow, oldCol] = node.oldPos;
    const deltaX = (newCol - oldCol) * Animator.TILE_DIST;
    const deltaY = (newRow - oldRow) * Animator.TILE_DIST;
    Promise.all([
      this._slideTile(this._$blank, this._propAttr(deltaX), this._propAttr(deltaY)),
      this._slideTile(this._$tile(node), this._propAttr(-1 * deltaX), this._propAttr(-1 * deltaY))
    ]).then(() => {
      this._animating = false;
      node.resolve();
      this._run();
    });
  }
  _slideTile($tile, leftVal, topVal) {
    return new Promise(resolve => {
      const opts = this._animationOpts(resolve);
      $tile.animate({ left: leftVal, top: topVal }, opts);
    });
  }
  _propAttr(val) {
    return `${val > 0 ? '+' : '-'}=${Math.abs(val)}`;
  }
  _$tile(node) {
    const [elementRow, elementCol] = node.elementPos;
    return this._$rows.eq(elementRow).find('.tile').eq(elementCol);
  }
  get _$blank() {
    return $('#tile-blank');
  }
  get _$rows() {
    return $('.row');
  }
  _animationOpts(resolve) {
    return {
      duration: Animator.DURATION,
      complete: this._finish.bind(this, resolve),
      queue: false,
      easing: 'linear'
    };
  }
  _finish(resolve) {
    resolve();
  }
}
