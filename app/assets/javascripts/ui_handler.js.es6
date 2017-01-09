class UiHandler {
  constructor(game, solver) {
    this.game = game;
    this.solver = solver;
    this.moves = [];
    this.hints = 0;
    this.startBoard = null;
    this.listening = true;
    this.complete = false;
    this.started = false;
    this.queue = [];
  }
  listen() {
    $('body').on('keyup', this._handleEvent.bind(this));
    $('body').swipe({
      swipe: (_, direction) => {
        if (this.listening) {
          this._updateBoard(direction);
        }
      }
    });
    $('#hint-button').click(() => {
      if (this.listening) this._hint();
    });
    $('#shuffle-button').click(() => {
      if (this.listening) this._start();
    });
    $('#count-button').click(() => {
      if (this.listening) this._start(false);
    });
    $('#solve-button').click(() => {
      if (this.listening) this._solve();
    });
  }
  _handleEvent(event) {
    if (this.listening) {
      const direction = this._handleInput(event.keyCode);
      if (direction) {
        this._updateBoard(direction);
      }
      return true;
    }
  }
  _gameOver(solved) {
    this._$solvedTitle.stop(true, true);
    if (solved) {
      this._$solvedTitle.animate({ opacity: 1 });
      this.complete = true;
    } else {
      this._$solvedTitle.animate({ opacity: 0 });
    }
  }
  _addMove(move) {
    if (this.started) {
      this.moves.push(move);
      this._$steps.text(this.moves.length);
    }
  }
  _start(randomize = true) {
    if (this.started && !this.complete) {
      return;
    }
    if (randomize) {
      const steps = this.game.randomizeBoard();
      this._queueMoves(steps).then(() => {
        this._resetGameState();
      });
    } else {
      this._resetGameState();
    }
  }
  _resetGameState() {
    this.started = true;
    this.complete = false;
    this.hints = 0;
    this.moves.length = 0;
    this.startBoard = this.game.board.clone();
    this.solver.solve(this.startBoard).then(steps =>
      this._$optimal.text(steps.length)
    );
    this._$solvedTitle.animate({ opacity: 0 });
    this._$steps.text('0');
    this._$hints.text('0');
  }
  _solve() {
    this.solver.solve(this.game.board).then(steps => {
      this._queueMoves(steps)
    });
  }
  _queueMoves(steps) {
    return new Promise(resolve => {
      this.queue.push({ steps: steps, resolve: resolve });
      this._fastAnimate();
    });
  }
  _fastAnimate() {
    if (!this.listening || this.queue.length === 0) {
      return;
    }
    this.listening = false;
    const { steps, resolve } = this.queue.shift();

    this._setFastDuration(steps.length);
    return Promise.all(
      steps.map(step => this._updateBoard(step))
    ).then(() => {
      Animator.DURATION = this._normalDuration;
      this.listening = true;
      resolve();
      this._fastAnimate();
    });

  }
  _hint() {
    if (this.started) {
      this.hints++;
      this._$hints.text(this.hints);
    }
    this.solver.solve(this.game.board).then(steps =>
      this._updateBoard(steps[0])
    );
  }
  _updateBoard(direction) {
    return new Promise((resolve) => {
      this.game.updateBoard(direction)
        .then(solved => {
          this._addMove(direction);
          this._gameOver(solved);
          resolve();
        }, () => resolve());
    });
  }
  _setFastDuration(count) {
    if (!this._normalDuration) {
      this._normalDuration = Animator.DURATION;
    }
    Animator.DURATION = Math.floor(1500 / (count < 8 ? 8 : count))
  }
  _handleInput(code) {
    switch (code) {
      case 38:
      case 75:
        return Board.MOVE_UP;
      case 40:
      case 74:
        return Board.MOVE_DOWN;
      case 37:
      case 72:
        return Board.MOVE_LEFT;
      case 39:
      case 76:
        return Board.MOVE_RIGHT;
      case 32:
        this._start();
        break;
      case 78:
        this._start(false);
        break;
      case 83:
        this._solve();
        break;
      case 81:
        this._hint();
        break;
    };
  }
  get _$solvedTitle() {
    if (!this.__$solveTitle) {
      this.__$solvedTitle = $('.title.solved');
    }
    return this.__$solvedTitle;
  }
  get _$optimal() {
    if (!this.__$optimal) {
      this.__$optimal = $('#optimal');
    }
    return this.__$optimal;
  }
  get _$steps() {
    if (!this.__$steps) {
      this.__$steps = $('#steps');
    }
    return this.__$steps;
  }
  get _$hints() {
    if (!this.__$hints) {
      this.__$hints = $('#hints');
    }
    return this.__$hints;
  }
}
