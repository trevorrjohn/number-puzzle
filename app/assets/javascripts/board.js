class Board {
  static get MOVE_UP() {
    return 'up';
  }
  static get MOVE_DOWN() {
    return 'down';
  }
  static get MOVE_LEFT() {
    return 'left';
  }
  static get MOVE_RIGHT() {
    return 'right';
  }
  constructor(grid = Helper.solvedGrid, blankPos = Helper.solvedBlankPos, helper = new Helper()) {
    this.helper = helper;
    this.blankPos = [].concat(blankPos);
    this.grid = [];
    for (let r = 0, size = grid.length; r < size; r++) {
      this.grid.push([].concat(grid[r]))
    }
  }
  /*
   * Return all valid moves for the current position
   */
  validMoves() {
    const [row, col] = this.blankPos;
    const moves = [];
    if (row > 0) {
      moves.push(Board.MOVE_UP);
    }
    if (row < this.grid.length - 1) {
      moves.push(Board.MOVE_DOWN);
    }
    if (col > 0) {
      moves.push(Board.MOVE_LEFT);
    }
    if (col < this.grid.length - 1) {
      moves.push(Board.MOVE_RIGHT);
    }
    return moves;
  }
  /*
   * Update the position in the direction if valid move
   */
  move(direction) {
    if (!this.validMoves().includes(direction)) {
      return false;
    }
    const newPos = this._newPosition(direction);
    this._swap(this.grid, newPos[0], newPos[1]);
    this.blankPos = newPos;
    return true;
  }
  /*
   * calculates the absolute minimum number of steps to
   * solve the puzzle
   */
  get stepsEstimate() {
    let steps = 0;
    const size = this.grid.length;
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        const number = this.grid[r][c];
        if (number > 0) {
          steps += this.helper.distanceToOriginal(number, r, c);
        }
      }
    }
    return steps;
  }
  get isSolved() {
    return this.stepsEstimate === 0;
  }
  /*
   * clone the board
   */
  clone() {
    return new Board(this.grid, this.blankPos, this.helper);
  }
  equal(other) {
    if (!other) {
      return false;
    }
    if (other === this) {
      return true;
    }
    return this.grid + '' === other.grid + '';
  }
  _newPosition(direction) {
    const [row, col] = this.blankPos;
    switch (direction) {
      case Board.MOVE_LEFT:
        return [row, col - 1];
      case Board.MOVE_RIGHT:
        return [row, col + 1];
      case Board.MOVE_UP:
        return [row - 1, col];
      case Board.MOVE_DOWN:
        return [row + 1, col];
    }
  }
  _swap(grid, row, col) {
    const num = grid[row][col];
    const [blankRow, blankCol] = this.blankPos;
    grid[blankRow][blankCol] = num;
    grid[row][col] = -1;
  }
}
