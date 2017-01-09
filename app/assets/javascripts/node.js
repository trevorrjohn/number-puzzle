class Node {
  constructor(board, steps = []) {
    this.board = board;
    this.steps = [].concat(steps);
  }
  get heapSort() {
    return this.board.stepsEstimate + this.steps.length;
  }
  get isSolved() {
    return this.board.isSolved;
  }
}
