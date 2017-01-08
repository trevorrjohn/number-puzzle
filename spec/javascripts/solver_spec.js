describe('Solver#solve', function() {
  describe('when the board is already solved', function() {
    it('returns empty steps', function(done) {
      const helper = new Helper();
      Helper.GRID_SIZE = 2;
      const grid = [[1, 2],[3,-1]];
      const board = new Board(grid, [2, 2], helper);
      const solver = new Solver(helper);
      solver.solve(board).then(steps => {
        expect(steps.length).toBe(0);
        done();
      })
    });
  });
  describe('solving a board', function() {
    it('solves a 2x2 grid', function(done) {
      const helper = new Helper();
      Helper.GRID_SIZE = 2;
      const grid = [[-1, 2],[1,3]];
      const board = new Board(grid, [0, 0], helper);
      const solver = new Solver(helper);
      solver.solve(board).then(steps => {;
        expect(steps).toEqual(['down','right']);
        done();
      });
    });
    it('solves a 3x3 grid', function(done) {
      const helper = new Helper();
      Helper.GRID_SIZE = 3;
      const grid = [
        [1, -1, 3],
        [4, 2, 6],
        [7, 5, 8]
      ];
      const board = new Board(grid, [0, 1], helper);
      const solver = new Solver(helper);
      solver.solve(board).then(steps => {;
        expect(steps).toEqual(['down','down','right']);
        done();
      });
    });
    it('solves a 4x4 grid', function(done) {
      const helper = new Helper();
      Helper.GRID_SIZE = 4;
      const grid = [
        [  1 ,  2 ,  3 ,  4 ],
        [  5 , 10 ,  6 ,  8 ],
        [  9 , 15 , 14 , 11 ],
        [ 13 ,  7 , -1 , 12 ]
      ];
      const board = new Board(grid, [3, 2], helper);
      const solver = new Solver(helper);
      solver.solve(board).then(steps => {;
        expect(steps.length).toBe(11);
        if (!(steps + '' === 'left,up,right,down,left,up,up,right,down,right,down' ||
          steps + '' === 'up,left,down,right,up,left,up,right,down,right,down')) {
            fail('steps not valid\nsteps: ' + steps);
        }
        done();
      });
    });
    it("can solve a complex 4x4 board", function(done) {
      const helper = new Helper();
      Helper.GRID_SIZE = 4;
      const grid = [
        [  1 ,  7 ,  3 ,  4 ],
        [ 10 ,  2 ,  6 , 14 ],
        [  5 , -1 , 12 ,  8 ],
        [  9 , 13 , 11 , 15 ]
      ];
      const board = new Board(grid, [2, 1], helper);
      const solver = new Solver(helper);
      solver.solve(board).then(steps => {;
        expect(steps.length).toBe(25);
        const solutions = [
          'right,down,right,down,right,up,up,up,left,left,down,right,right,up,left,down,down,down,right,up,up,left,down,down,right',
          'up,left,up,right,down,left,left,left,down,down,right,up,right,up,left,down,right,down,right',
          'up,up,right,down,right,down,left,up,left,down,right,up,up,left,down,left,down,down,right,up,up,right,down,down,right',
          'right,up,right,up,left,left,down,right,down,left,up,left,down,down,right,up,up,right,up,right,down,down,left,down,right',
        ];
        if (!solutions.includes(steps + '')) {
          fail('steps not valid\nsteps: ' + steps);
        }
        done();
      });
    });
  });
});

