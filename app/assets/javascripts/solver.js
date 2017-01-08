class Solver {
  constructor(helper) {
    this.helper = helper;
  }
  solve(board) {
    const heap = new MinHeap();
    heap.push(new Node(board));
    return new Promise((resolve, reject) => this._solve(heap, resolve, reject));
  }
  _solve(heap, resolve, reject) {
    while (!heap.isEmpty()) {
      const node = heap.pop();
      if (node.isSolved) {
        resolve(node.steps);
        return;
      }

      const validMoves = this.helper.shuffleArray(node.board.validMoves());
      const lastStep = node.steps[node.steps.length - 1];
      validMoves.forEach(move => {
        if (this.helper.oppositeDirection(move) !== lastStep) {
          const nextBoard = node.board.boardAfterMove(move);
          const nextSteps = node.steps.concat([move]);
          heap.push(new Node(nextBoard, nextSteps));
        }
      });
    }
  }
}
