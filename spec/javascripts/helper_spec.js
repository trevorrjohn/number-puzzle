describe('Helper', function() {
  let originalSize;
  beforeEach(() => {
    originalSize = Helper.GRID_SIZE;
  });
  afterEach(() => {
    Helper.GRID_SIZE = originalSize;
  });
  describe('#oppositeDirection', function() {
    it('returns the opposite direction', function() {
      const helper = new Helper();
      expect(helper.oppositeDirection(Board.MOVE_UP)).toBe(Board.MOVE_DOWN);
      expect(helper.oppositeDirection(Board.MOVE_DOWN)).toBe(Board.MOVE_UP);
      expect(helper.oppositeDirection(Board.MOVE_RIGHT)).toBe(Board.MOVE_LEFT);
      expect(helper.oppositeDirection(Board.MOVE_LEFT)).toBe(Board.MOVE_RIGHT);
      expect(helper.oppositeDirection('foo')).not.toBeDefined();
    });
  });
  describe('#distanceToOriginal', function() {
    it('returns the steps to the orignial positino', function() {
      const helper = new Helper();
      Helper.GRID_SIZE = 3;
      /*
       * 1 * 2 *  3 *
       * 4 * 5 *  6 *
       * 7 * 8 * -1 *
       */
      expect(helper.distanceToOriginal(1, 0, 0)).toBe(0)
      expect(helper.distanceToOriginal(1, 2, 0)).toBe(2)
      expect(helper.distanceToOriginal(1, 2, 2)).toBe(4)
      expect(helper.distanceToOriginal(1, 2, 1)).toBe(3)
      expect(helper.distanceToOriginal(1, 1, 1)).toBe(2)
      expect(helper.distanceToOriginal(2, 1, 1)).toBe(1)
      expect(helper.distanceToOriginal(3, 1, 0)).toBe(3)
      expect(helper.distanceToOriginal(8, 0, 0)).toBe(3)

      Helper.GRID_SIZE = 4;
      /*
       * 1  *  2 *  3 *  4 *
       * 5  *  6 *  7 *  8 *
       * 9  * 10 * 11 * 12 *
       * 13 * 14 * 15 * -1 *
       */
      expect(helper.distanceToOriginal(1, 0, 0)).toBe(0)
      expect(helper.distanceToOriginal(10, 2, 1)).toBe(0)
      expect(helper.distanceToOriginal(15, 0, 0)).toBe(5)
      expect(helper.distanceToOriginal(8, 3, 0)).toBe(5)
    });
  });
  describe("#solvedPosition", function() {
    it("returns the correct position for the number", function() {
      const helper = new Helper();
      Helper.GRID_SIZE = 3;
      expect(helper.solvedPosition(1)).toEqual([0, 0]);
      expect(helper.solvedPosition(2)).toEqual([0, 1]);
      expect(helper.solvedPosition(3)).toEqual([0, 2]);
      expect(helper.solvedPosition(4)).toEqual([1, 0]);
      expect(helper.solvedPosition(5)).toEqual([1, 1]);
      expect(helper.solvedPosition(8)).toEqual([2, 1]);
      Helper.GRID_SIZE = 5;
      expect(helper.solvedPosition(5)).toEqual([0, 4]);
      expect(helper.solvedPosition(8)).toEqual([1, 2]);
      expect(helper.solvedPosition(18)).toEqual([3, 2]);
    });
  });
});
