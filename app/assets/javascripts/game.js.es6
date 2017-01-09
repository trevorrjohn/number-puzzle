class Game {
  static get DIFFICULTY() {
    return 35;
  }
  constructor(board, animator, helper) {
    this.board = board;
    this.animator = animator;
    this.helper = helper;
  }
  updateBoard(direction) {
    return new Promise((resolve, reject) => {
      const oldPos = this.board.blankPos;
      if (!this.board.move(direction)) {
        return reject();
      }
      const newPos = this.board.blankPos;
      const number = this.board.grid[oldPos[0]][oldPos[1]];
      this.animator.animate(number, newPos, oldPos)
        .then(() => resolve(this.board.isSolved));
    });
  }
  randomizeBoard() {
    let lastMove;
    const moves = [];
    let board = this.board;
    for (let i = 0; i < Game.DIFFICULTY; i++) {
      const { move, newBoard } = this._validNextMove(board, lastMove);
      moves.push(move);
      board = newBoard;
      lastMove = move;
    }
    return moves;
  }
  _validNextMove(board, lastMove) {
    const oppositeDirection = this.helper.oppositeDirection(lastMove);
    const moves = this.helper.shuffleArray(board.validMoves());
    let move = moves.shift();
    if (move === oppositeDirection) {
      move = moves.shift();
    }
    const newBoard = board.clone();
    newBoard.move(move);
    return { move: move, newBoard: newBoard };
  }
}
