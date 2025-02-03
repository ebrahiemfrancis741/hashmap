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

  set(key, value) {
    let hashCode = this.hash(key);
    let keyValuePair = {};
    /*  
      Only add linked list to a bucket when needed. Ideally 
      we should only make it a linked list if/when a collision 
      occurs, but we are just keeping it simple for now. Can 
      always be changed later
    */
    if (this.#data[hashCode] == undefined) {
      this.#data[hashCode] = createLinkedList();
      keyValuePair[key] = value;
      this.#data[hashCode].append(JSON.stringify(keyValuePair));
    } else {
      /*
        check if we need to update key:value pair or 
        add a new key:value pair
      */
      /*
        We will need to traverse the list for this since we cannot 
        simply use the linkedList.contains(value) method or the 
        linkedList.find(value) method because the value is stored 
        as JSON with key:(old value) and we do not know the old value 
        to make a match
      */
      for (let i = 0; i < this.#data[hashCode].size; i++) {
        let node = JSON.parse(this.#data[hashCode].at(i));
        if (node.hasOwnProperty(key)) {
          // update the key:value pair by removing it and adding it again
          this.#data[hashCode].removeAt(i);
          keyValuePair[key] = value;
          this.#data[hashCode].append(JSON.stringify(keyValuePair));
          return;
        }
      }
      // if we reach this point we need to add new node in the list
      keyValuePair[key] = value;
      this.#data[hashCode].append(JSON.stringify(keyValuePair));
    }
  }

  get(key) {
    let hashCode = this.hash(key);
    if (this.#data[hashCode] == undefined) {
      // empty bucket, return null
      return null;
    } else {
      let keyValuePair;
      for (let i = 0; i < this.#data[hashCode].size; i++) {
        keyValuePair = JSON.parse(this.#data[hashCode].at(i));
        /*
          Use hasOwnProperty() because the value of each node in the list 
          is an object and we are looking for the property name of that 
          object
        */
        if (keyValuePair.hasOwnProperty(key)) {
          return keyValuePair[key];
        }
      }
      // if key not found return null
      return null;
    }
  }

  has(key) {
    let hashCode = this.hash(key);
    if (this.#data[hashCode] == undefined) {
      // bucket is empty
      return false;
    }
    for (let i = 0; i < this.#data[hashCode].size; i++) {
      let data = JSON.parse(this.#data[hashCode].at(i));
      if (data.hasOwnProperty(key)) {
        return true;
      }
    }
    // bucket isnt empty and the key doesnt exist
    return false;
  }

  remove(key) {
    if (!this.has(key)) {
      return false;
    } else {
      let hashCode = this.hash(key);
      for (let i = 0; i < this.#data[hashCode].size; i++) {
        let data = JSON.parse(this.#data[hashCode].at(i));
        if (data.hasOwnProperty(key)) {
          this.#data[hashCode].removeAt(i);
          // if the link list is empty lets just remove it
          if (this.#data[hashCode].size == 0) {
            this.#data[hashCode] = undefined;
          }

          return true;
        }
      }
    }
  }

  length() {
    let count = 0;
    for (let i = 0; i < this.#capacity; i++) {
      if (this.#data[i] != undefined) {
        count += this.#data[i].size;
      }
    }
    return count;
  }

  clear() {
    for (let i = 0; i < this.#capacity; i++) {
      this.#data[i] = undefined;
    }
  }

  keys() {
    //Object.entries(object)
    let keys = [];
    for (let i = 0; i < this.#capacity; i++) {
      if (this.#data[i] != undefined) {
        for (let j = 0; j < this.#data[i].size; j++) {
          let data = JSON.parse(this.#data[i].at(j));
          let keyValuePairs = Object.entries(data);
          let key = keyValuePairs[0][0];
          keys.push(key);
        }
      }
    }
    return keys;
  }

  values() {
    let keys = this.keys();
    let values = [];
    for (let i = 0; i < keys.length; i++) {
      values.push(this.get(keys[i]));
    }
    return values;
  }

  entries() {
    let keys = this.keys();
    let entries = [];
    for (let i = 0; i < keys.length; i++) {
      entries.push([keys[i], this.get(keys[i])]);
    }
    return  entries;
  }
}

const test = new HashMap();
test.set("apple", "1");
test.set("apple", "2");
test.set("apple", "3");
test.set("orange", "4");
test.set("orange", "5");
test.set("banana", "6");
test.set("banana", "7");

console.log(test.entries());
