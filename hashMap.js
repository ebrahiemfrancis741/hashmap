class HashMap {
  #data;
  #loadFactor;
  #capacity;

  constructor() {
    this.#data = new Array(16);
    this.#capacity = 16;
    this.#loadFactor = 0.75;
  }

  get data() {
    return this.#data;
  }

  set data(data) {
    this.#data = data;
  }

  get loadFactor() {
    return this.#loadFactor;
  }

  set loadFactor(loadFactor) {
    this.#loadFactor = loadFactor;
  }

  get capacity() {
    this.#capacity;
  }

  set capacity(capacity) {
    this.#capacity = capacity;
  }
}
