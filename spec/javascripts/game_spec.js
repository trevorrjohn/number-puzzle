describe('Game', function() {
  describe('#updateBoard', function() {
    describe('when it is a valid move', function() {
      it('updates the animator and resolves', function(done) {
        const board = new Board();
        const helper = new Helper();
        const animator = new Animator(helper);
        const game = new Game(board, animator, helper)
        spyOn(animator, 'animate').and.returnValue(Promise.resolve());

        game.updateBoard(Board.MOVE_LEFT).then(solved => {
          expect(animator.animate).toHaveBeenCalledWith(15, [3, 2], [3, 3]);
          expect(solved).toBe(false);
          done();
        });
      });
      describe('when is is solved', function() {
        it('resolves with true', function(done) {
          const board = new Board();
          const helper = new Helper();
          const animator = new Animator(helper);
          const game = new Game(board, animator, helper)
          spyOn(animator, 'animate').and.returnValue(Promise.resolve());

          game.updateBoard(Board.MOVE_LEFT).then(() => {
            expect(animator.animate).toHaveBeenCalledWith(15, [3, 2], [3, 3]);
            animator.animate.calls.reset();
            game.updateBoard(Board.MOVE_RIGHT).then(solved => {
              expect(animator.animate).toHaveBeenCalledWith(15, [3, 3], [3, 2]);
              expect(solved).toBe(true);
              done();
            });
          });
        });
      });
    });
    describe('when it is an invalid move', function() {
      it('does not animate and rejects', function(done) {
        const board = new Board();
        const helper = new Helper();
        const animator = new Animator(helper);
        const game = new Game(board, animator, helper)
        spyOn(animator, 'animate').and.returnValue(Promise.resolve());

        game.updateBoard(Board.MOVE_RIGHT).then(solved => {
          fail('should be rejected');
        }, () => {
          expect(animator.animate).not.toHaveBeenCalled();
          done();
        });
      });
    });
  });
});
