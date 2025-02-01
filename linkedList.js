import { createNode } from "./node.js";

function createLinkedList() {
  return {
    head: null,
    tail: null,
    size: 0,
    append: function (value) {
      if (this.size == 0) {
        this.head = createNode(value);
        this.tail = this.head;
      } else {
        this.tail.next = createNode(value);
        this.tail = this.tail.next;
      }
      this.size++;
    },
    prepend: function (value) {
      let temp = this.head;
      this.head = createNode(value);
      this.head.next = temp;
      this.size++;
    },
    at: function (index) {
      if (index < 0) {
        return undefined;
      } else {
        let i = 0;
        let value;
        let node = this.head;
        while (node != null) {
          if (i == index) {
            return node.value;
          }
          i++;
          node = node.next;
        }
        return value;
      }
    },
    pop: function () {
      let node = this.head;
      // loop until 2nd last element
      for (let i = 1; i <= this.size - 2; i++) {
        node = node.next;
      }
      // remove last element and make element before it the tail
      node.next = null;
      this.tail = node;
      this.size--;
    },
    contains: function (value) {
      let node = this.head;
      for (let i = 0; i < this.size; i++) {
        if ((node.value = value)) {
          return true;
        }
        node = node.next;
      }
      return false;
    },
    find: function (value) {
      let node = this.head;
      for (let i = 0; i < this.size; i++) {
        if (node.value == value) {
          return i;
        }
        node = node.next;
      }
      return null;
    },
    toString: function () {
      let node = this.head;
      if (node == null) {
        console.log("( null )");
        return;
      }
      let string = "";
      while (node != null) {
        string += `( ${node.value} ) -> `;
        node = node.next;
      }
      string += "null";
      return string;
    },
    insertAt: function (value, index) {
      let node = this.head;
      let prevNode;

      if (index > this.size - 1) {
        return undefined;
      }

      // index 0 is a special case, because then we would have to make it
      // the head
      if (index == 0) {
        // use prepend because it does what we want
        this.prepend(value);
        return;
      } else {
        // start at 1 because we already have the first node
        for (let i = 1; i <= index; i++) {
          prevNode = node;
          node = node.next;
          if (i == index) {
            prevNode.next = createNode(value);
            prevNode.next.next = node;
            this.size++;
            return;
          }
        }
      }
    },
    removeAt: function (index) {
      let node = this.head;
      let prevNode;

      if (index < 0 || index > this.size - 1) {
        return undefined;
      }

      /*
        if index 0 or equal to this.size - 1, its a special 
        case, that requres reassigning the head and or tail
      */
      if (index == 0) {
        this.head = node.next;
        this.size--;
        return;
      } else if (index == this.size - 1) {
        this.pop();
        return;
      } else {
        for (let i = 1; i <= index; i++) {
          prevNode = node;
          node = node.next;
          if (i == index) {
            let temp = node.next;
            prevNode.next = temp;
            this.size--;
            return;
          }
        }
      }
    },
  };
}

export { createLinkedList };
