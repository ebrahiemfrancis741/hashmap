import { LinkedList } from "ef-linked-list";
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
    return this.#capacity;
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

  // rehash keys and store key,value pairs in the upgraded hashmap
  rehash() {
    let entries = this.entries();
    this.capacity *= 2;
    this.clear();
    for (let i = 0; i < entries.length; i++) {
      this.set(entries[i][0], entries[i][1]);
    }
  }

  set(key, value) {
    let hashCode = this.hash(key);
    let keyValuePair = {};

    if (this.length() >= this.capacity * this.loadFactor) {
      this.rehash();
    }

    if (this.data[hashCode] == undefined) {
      keyValuePair[key] = value;
      this.data[hashCode] = JSON.stringify(keyValuePair);
    } else if (this.data[hashCode] instanceof LinkedList) {
      /*
        A linked list exists here we either update or append a new value
      */
      let currenKVpair;
      for (let i = 0; i < this.data[hashCode].length; i++) {
        currenKVpair = JSON.parse(this.data[hashCode].at(i));
        if (currenKVpair.hasOwnProperty(key)) {
          // update the value
          currenKVpair[key] = value;
          this.data[hashCode].removeAt(i);
          this.data[hashCode].append(JSON.stringify(currenKVpair));
        }
      }
      keyValuePair[key] = value;
      this.data[hashCode].append(JSON.stringify(keyValuePair));
    } else {
      /*
        key,value pair exists in this bucket but now a collision has 
        occured or we need to update the value if the key is the same
      */
      let currenKVpair = JSON.parse(this.data[hashCode]);
      if (currenKVpair.hasOwnProperty(key)) {
        // update the value
        currenKVpair[key] = value;
        this.data[hashCode] = JSON.stringify(currenKVpair);
      } else {
        // need to add new value to this bucket by making it a linked list
        this.data[hashCode] = new LinkedList();
        this.data[hashCode].append(JSON.stringify(currenKVpair));
        keyValuePair[key] = value;
        this.data[hashCode].append(JSON.stringify(keyValuePair));
      }
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
    return entries;
  }
}

const test = new HashMap();
test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");
// test.set('moon', 'silver');
console.log(test);
