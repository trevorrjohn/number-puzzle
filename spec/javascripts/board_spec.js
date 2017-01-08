describe('Board', function() {
  let originalSize;
  beforeEach(() => {
    originalSize = Helper.GRID_SIZE;
  });
  afterEach(() => {
    Helper.GRID_SIZE = originalSize;
  });
  it('builds the default grid and injects dependencies', function() {
    const grid = [ [1, 2], [3, -1] ];
    const helper = new Helper();
    const board = new Board(grid, [1, 1], helper);
    expect(board.grid[0][0]).toBe(1);
    expect(board.grid[0][1]).toBe(2);
    expect(board.grid[1][0]).toBe(3);
    expect(board.grid[1][1]).toBe(-1);
    expect(board.blankPos).toEqual([1, 1]);
    expect(board.helper).toBe(helper);
  });
  describe('#move', function() {
    describe('when valid direction', function() {
      it('swaps the blank with the tile in the direction', function() {
        const board = new Board();
        expect(board.move(Board.MOVE_LEFT)).toBeTruthy();
        expect(board.grid[3][2]).toBe(-1);
        expect(board.grid[3][3]).toBe(15);
        expect(board.move(Board.MOVE_LEFT)).toBeTruthy();
        expect(board.grid[3][1]).toBe(-1);
        expect(board.grid[3][2]).toBe(14);
        expect(board.move(Board.MOVE_UP)).toBeTruthy();
        expect(board.grid[2][1]).toBe(-1);
        expect(board.grid[3][1]).toBe(10);
        expect(board.move(Board.MOVE_UP)).toBeTruthy();
        expect(board.grid[1][1]).toBe(-1);
        expect(board.grid[2][1]).toBe(6);
        expect(board.move(Board.MOVE_RIGHT)).toBeTruthy();
        expect(board.grid[1][2]).toBe(-1);
        expect(board.grid[1][1]).toBe(7);
        expect(board.move(Board.MOVE_RIGHT)).toBeTruthy();
        expect(board.grid[1][3]).toBe(-1);
        expect(board.grid[1][2]).toBe(8);
        expect(board.move(Board.MOVE_DOWN)).toBeTruthy();
        expect(board.grid[2][3]).toBe(-1);
        expect(board.grid[1][3]).toBe(12);
        expect(board.move(Board.MOVE_DOWN)).toBeTruthy();
        expect(board.grid[3][3]).toBe(-1);
        expect(board.grid[2][3]).toBe(15);
      });
    });
    describe('when invalid direction', function() {
      it('does not change grid position', function() {
        const board = new Board();
        expect(board.move(Board.MOVE_RIGHT)).toBeFalsy();
        expect(board.grid[3][3]).toBe(-1);
        expect(board.move(Board.MOVE_DOWN)).toBeFalsy();
        expect(board.grid[3][3]).toBe(-1);
        board.move(Board.MOVE_LEFT);
        board.move(Board.MOVE_LEFT);
        board.move(Board.MOVE_LEFT);
        expect(board.grid[3][0]).toBe(-1);
        expect(board.move(Board.MOVE_LEFT)).toBeFalsy();
        expect(board.grid[3][0]).toBe(-1);
        board.move(Board.MOVE_UP);
        board.move(Board.MOVE_UP);
        board.move(Board.MOVE_UP);
        expect(board.grid[0][0]).toBe(-1);
        expect(board.move(Board.MOVE_UP)).toBeFalsy();
        expect(board.grid[0][0]).toBe(-1);
      });
    });
  });
  describe('#validMoves', function() {
    it('only returns moves where the blank tile can go', function() {
      const board = new Board();
      let moves = board.validMoves();
      expect(moves.length).toBe(2);
      expect(moves).toEqual(jasmine.arrayContaining([Board.MOVE_UP, Board.MOVE_LEFT]));

      board.move(Board.MOVE_LEFT);

      moves = board.validMoves();
      expect(moves.length).toBe(3);
      expect(moves).toEqual(jasmine.arrayContaining([Board.MOVE_UP, Board.MOVE_LEFT, Board.MOVE_RIGHT]));

      board.move(Board.MOVE_LEFT);
      board.move(Board.MOVE_LEFT);

      moves = board.validMoves();
      expect(moves.length).toBe(2);
      expect(moves).toEqual(jasmine.arrayContaining([Board.MOVE_UP, Board.MOVE_RIGHT]));

      board.move(Board.MOVE_UP);

      moves = board.validMoves();
      expect(moves.length).toBe(3);
      expect(moves).toEqual(jasmine.arrayContaining([Board.MOVE_UP, Board.MOVE_RIGHT, Board.MOVE_DOWN]));

      board.move(Board.MOVE_RIGHT);

      moves = board.validMoves();
      expect(moves.length).toBe(4);
      expect(moves).toEqual(jasmine.arrayContaining([Board.MOVE_UP, Board.MOVE_RIGHT, Board.MOVE_DOWN, Board.MOVE_LEFT]));

      board.move(Board.MOVE_UP);
      board.move(Board.MOVE_UP);

      moves = board.validMoves();
      expect(moves.length).toBe(3);
      expect(moves).toEqual(jasmine.arrayContaining([Board.MOVE_RIGHT, Board.MOVE_DOWN, Board.MOVE_LEFT]));
    });
  });
  describe('#stepsEstimate', function() {
    describe('when it is solved', function() {
      it('returns 0', function() {
        const grid = [[1, 2, 3], [4, 5, 6], [7, 8, -1]];
        Helper.GRID_SIZE = 3;
        const helper = new Helper();
        const board = new Board(grid, [2, 2], helper);
        expect(board.stepsEstimate).toBe(0);
      });
    });
    describe('when it is not solved', function() {
      it('returns the minimum number of theoretical steps to solve the puzzle', function() {
        const grid = [[2, 1, 3], [5, 4, 6], [-1, 7, 8]];
        Helper.GRID_SIZE = 3;
        const helper = new Helper();
        const board = new Board(grid, [2, 2], helper);
        expect(board.stepsEstimate).toBe(6);
      });
    });
  });
  describe('#boardAfterMove', function() {
    describe('when the move is not valid', function() {
      it('throws an error', function() {
        const grid = [[2, 1, 3], [5, 4, 6], [-1, 7, 8]];
        Helper.GRID_SIZE = 3;
        const helper = new Helper();
        const board = new Board(grid, [2, 0], helper);
        expect(board.boardAfterMove.bind(board, Board.MOVE_DOWN)).toThrow('Invalid Move!');
      });
    });
    describe('when the move is valid', function() {
      it('returns updated board with grid and does not modify existing grid', function() {
        const grid = [[2, 1, 3], [5, 4, 6], [-1, 7, 8]];
        Helper.GRID_SIZE = 3;
        const helper = new Helper();

        let board = new Board(grid, [2, 0], helper);
        let newBoard = board.boardAfterMove(Board.MOVE_UP);

        expect(newBoard.grid).toEqual([[2,1,3],[-1,4,6],[5,7,8]]);
        expect(newBoard.blankPos).toEqual([1, 0]);
        expect(board.grid).toEqual(grid);
        expect(board.blankPos).toEqual([2, 0]);

        board = newBoard;
        newBoard = board.boardAfterMove(Board.MOVE_RIGHT);

        expect(newBoard.grid).toEqual([[2,1,3],[4,-1,6],[5,7,8]]);
        expect(newBoard.blankPos).toEqual([1, 1]);
        expect(board.grid).toEqual([[2,1,3],[-1,4,6],[5,7,8]]);
        expect(board.blankPos).toEqual([1, 0]);
        expect(board.helper).toBe(helper);

        board = newBoard;
        newBoard = board.boardAfterMove(Board.MOVE_DOWN);

        expect(newBoard.grid).toEqual([[2,1,3],[4,7,6],[5,-1,8]]);
        expect(newBoard.blankPos).toEqual([2, 1]);
        expect(board.grid).toEqual([[2,1,3],[4,-1,6],[5,7,8]]);
        expect(board.blankPos).toEqual([1, 1]);

        board = newBoard;
        newBoard = board.boardAfterMove(Board.MOVE_LEFT);

        expect(newBoard.grid).toEqual([[2,1,3],[4,7,6],[-1,5,8]]);
        expect(newBoard.blankPos).toEqual([2, 0]);
        expect(board.grid).toEqual([[2,1,3],[4,7,6],[5,-1,8]]);
        expect(board.blankPos).toEqual([2, 1]);

        board = new Board([
          [  9 ,  8 , 15 ,  2 ],
          [  5 , 10 ,  1 , 12 ],
          [ 11 ,  3 , 13 ,  4 ],
          [  6 ,  7 , -1 , 14 ]
        ],
          [3, 2], helper)
        newBoard = board.boardAfterMove(Board.MOVE_LEFT);
        expect(newBoard.grid).toEqual(
        [[9,8,15,2],[5,10,1,12],[11,3,13,4],[6,-1,7,14]]);
        expect(newBoard.blankPos).toEqual([3, 1]);
        expect(board.grid).toEqual(
        [[9,8,15,2],[5,10,1,12],[11,3,13,4],[6,7,-1,14]]);
        expect(board.blankPos).toEqual([3, 2]);
      });
    });
  });
});
