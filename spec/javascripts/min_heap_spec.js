describe('MinHeap', function() {
  describe('#push / #pop', function() {
    it('adds item to data and sorts by heapSort', function() {
      const heap = new MinHeap();
      expect(heap.isEmpty()).toBe(true);
      heap.push({ heapSort: 2 });
      heap.push({ heapSort: 4 });
      heap.push({ heapSort: 7 });
      heap.push({ heapSort: 8 });
      heap.push({ heapSort: 1 });
      heap.push({ heapSort: 1 });
      heap.push({ heapSort: 3 });
      heap.push({ heapSort: 6 });
      heap.push({ heapSort: 14 });
      heap.push({ heapSort: 1 });
      expect(heap.isEmpty()).toBe(false);
      expect(heap.pop().heapSort).toBe(1);
      expect(heap.pop().heapSort).toBe(1);
      expect(heap.pop().heapSort).toBe(1);
      expect(heap.pop().heapSort).toBe(2);
      expect(heap.pop().heapSort).toBe(3);
      expect(heap.pop().heapSort).toBe(4);
      expect(heap.pop().heapSort).toBe(6);
      expect(heap.pop().heapSort).toBe(7);
      expect(heap.pop().heapSort).toBe(8);
      expect(heap.pop().heapSort).toBe(14);
      expect(heap.isEmpty()).toBe(true);
    });
  });
});
