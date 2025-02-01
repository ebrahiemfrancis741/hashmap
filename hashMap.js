import { createLinkedList } from "./linkedList.js";

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

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode = hashCode % this.#capacity;
    }

    return hashCode;
  }
}

const test = new HashMap();
