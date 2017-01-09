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
    it('delegates to board', function() {
      let node = new Node({ isSolved: true }, []);
      expect(node.isSolved).toBe(true);
      node = new Node({isSolved: false }, []);
      expect(node.isSolved).toBe(false);
    });
  });
});
