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
  describe('#clone', function() {
    it('creates a duplicate board', function() {
      const helper = new Helper();
      const grid = [
        [  9 ,  8 , 15 ,  2 ],
        [  5 , 10 ,  1 , 12 ],
        [ 11 ,  3 , 13 ,  4 ],
        [  6 ,  7 , -1 , 14 ]
      ];
      const blankPos = [3, 2];
      const board = new Board(grid, blankPos, helper)
      board.stepsEstimate;
      const clone = board.clone();
      expect(clone.blankPos).toEqual(board.blankPos);
      expect(clone.blankPos).not.toBe(board.blankPos);
      expect(clone.grid).toEqual(board.grid);
      expect(clone.grid).not.toBe(board.grid);
      expect(clone._stepsEstimate).toEqual(board.stepsEstimate);
      expect(clone.helper).toBe(helper);
    });
  });
  describe('#isSolved', function() {
    it('returns state based on steps estimate', function() {
      const board = new Board(Helper.solvedGrid);
      expect(board.isSolved).toBe(true);
      board.move(Board.MOVE_UP);
      expect(board.isSolved).toBe(false);
      board.move(Board.MOVE_DOWN);
      expect(board.isSolved).toBe(true);
    });
  });
  describe('#equal', function() {
    describe('when other is not an object', function() {
      it('is false', function() {
        const board = new Board();
        expect(board.equal(null)).toBe(false);
        expect(board.equal(undefined)).toBe(false);
      });
    });
    describe('when other is same object', function() {
      it('is true', function() {
        const board = new Board();
        expect(board.equal(board)).toBe(true);
      });
    });
    describe('when other is different object', function() {
      it('compares based on the grid', function() {
        const board = new Board();
        const other = new Board();
        expect(board.equal(other)).toBe(true);
        other.move(Board.MOVE_UP);
        expect(board.equal(other)).toBe(false);
      });
    });
  });
});
