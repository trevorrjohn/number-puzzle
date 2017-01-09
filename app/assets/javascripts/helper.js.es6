class Helper {
  static get GRID_SIZE() {
    return this.grid_size || 4;
  }
  static set GRID_SIZE(grid_size) {
    this.grid_size = grid_size;
  }
  static get solvedGrid() {
    const grid = [];
    for (let i = 0; i < Helper.GRID_SIZE; i++) {
      grid[i] = [];
      for (let j = 0; j < Helper.GRID_SIZE; j++) {
        grid[i][j] = (i * Helper.GRID_SIZE) + j + 1;
      }
    }
    grid[Helper.GRID_SIZE - 1][Helper.GRID_SIZE - 1] = -1
    return grid;
  }
  static get solvedBlankPos() {
    return [Helper.GRID_SIZE - 1, Helper.GRID_SIZE - 1];
  }
  static printGrid(grid) {
    let output = "\n";
    for (let row = 0; row < Helper.GRID_SIZE; row++) {
      for (let col = 0; col < Helper.GRID_SIZE; col++) {
        let num = grid[row][col];
        output += '| ' + (num > 0 && num < 10 ? ' ' + num : num) + ' ';
      }
      output += "|\n";
    }
    console.log(output);
  }
  oppositeDirection(direction) {
    switch (direction) {
      case Board.MOVE_UP:
        return Board.MOVE_DOWN;
      case Board.MOVE_DOWN:
        return Board.MOVE_UP;
      case Board.MOVE_LEFT:
        return Board.MOVE_RIGHT;
      case Board.MOVE_RIGHT:
        return Board.MOVE_LEFT;
    }
  }
  /*
   * Returns distance from a position to a number
   */
  distanceToOriginal(num, row, col) {
    const [origRow, origCol] = this.solvedPosition(num);
    return Math.abs(origRow - row) + Math.abs(origCol - col);
  }
  /*
   * returns the grid position of a number when solved
   */
  solvedPosition(number) {
    return [
      Math.floor((number - 1) / Helper.GRID_SIZE),
      (number - 1) % Helper.GRID_SIZE
    ];
  }
  /*
   * Source: http://stackoverflow.com/a/12646864
   */
  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }
}
