class MinHeap {
  static get MAX_SIZE() {
    return 10000;
  }
  constructor() {
    this.data = [];
  }
  push(node) {
    this.data.push(node);
    this._bubbleUp(this.data.length - 1)
    if (this.data.length === MinHeap.MAX_SIZE) {
      this.data.pop();
    }
  }
  pop() {
    const root = this.data[0];
    const last = this.data.pop();
    if (this.data.length > 0) {
      this.data[0] = last;
      this._bubbleDown(0);
    }
    return root;
  }
  isEmpty() {
    return this.data.length === 0;
  }
  _bubbleUp(index) {
    if (index === 0) {
      return;
    }
    const node = this.data[index];
    const parentIndex = Math.floor(index / 2);
    const parent = this.data[parentIndex];
    if (node.heapSort < parent.heapSort) {
      this.data[parentIndex] = node;
      this.data[index] = parent;
      this._bubbleUp(parentIndex);
    }
  }
  _bubbleDown(index) {
    const node = this.data[index];
    const leftIndex = 2 * index;
    const rightIndex = leftIndex + 1;
    const left = this.data[leftIndex];
    const right = this.data[rightIndex];
    let newIndex;
    if (left && left.heapSort < node.heapSort) {
      newIndex = leftIndex;
    }
    if (right && right.heapSort < left.heapSort
      && right.heapSort < node.heapSort) {
        newIndex = rightIndex;
    }
    if (newIndex) {
      this.data[index] = this.data[newIndex];
      this.data[newIndex] = node;
      this._bubbleDown(newIndex);
    }
  }
}
