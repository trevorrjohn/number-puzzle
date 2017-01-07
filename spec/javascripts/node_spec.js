describe('Node', function() {
  describe('#heapSort', function() {
    it('returns the boards stepsEstimate + the previous steps', function() {
      const board = { stepsEstimate: 40 };
      const steps = [ 'left', 'right' ];
      const node = new Node(board, steps);
      expect(node.heapSort).toBe(42);
    });
  });
  describe('isSolved', function() {
    describe('when the fewest steps on the board is 0', function() {
      it('is true', function() {
        const board = { stepsEstimate: 0 };
        const steps = { length: 20 };
        const node = new Node(board, steps);
        expect(node.isSolved).toBe(true);
      });
    });
    describe('when the fewest steps on the board is not zero', function() {
      it('is false', function() {
        const board = { stepsEstimate: 5 };
        const steps = { length: 0 };
        const node = new Node(board, steps);
        expect(node.isSolved).toBe(false);
      });
    });
  });
});
