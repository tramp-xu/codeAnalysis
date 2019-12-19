// class Node {
//   constructor (value, next) {
//     this.value = value
//     this.next = next
//   }
// }

// class LinkedList {
//   constructor () {
//     this.dummyHead = new Node(null, null)
//     this.size = 0
//   }

//   add (index, newNode) {
//     if (index > this.size || index < 0) {
//       throw new Error('索引非法')
//     }
//     let pre = this.dummyHead
//     for (let i = 0; i < index; i++) {
//       pre = pre.next
//     }
//     newNode.next = pre.next
//     pre.next = newNode
//     this.size++
//   }

//   addFirst (newNode) {
//     this.add(0, newNode)
//   }

//   addLast (newNode) {
//     this.add(size, newNode)
//   }

//   remove (index) {
//     if (index >= this.size || index < 0) {
//       throw new Error('索引非法')
//     }
//     let pre = this.dummyHead
//     for (let i =0; i < index; i++) {
//       pre = pre.next
//     }
//     let delNode = pre.next
//     pre.next = delNode.next
//     delNode.next = null
//     this.size--
//   }

//   removeFirst () {
//     this.remove(0)
//   }

//   removeLast () {
//     this.remove(this.size - 1)
//   }

//   removeElement (value) {
//     let pre = this.dummyHead

//     while (pre.next !== null) {
//       if (pre.next.value === value) {
//         break
//       }
//       pre = pre.next
//     }

//     if (pre.next !== null) {
//       let cur = pre.next
//       pre.next = cur.next
//       cur.next = null
//       this.size--
//       return cur
//     }

//     return null
//   }

//   contains (value) {
//     let cur = this.dummyHead.next
//     while (cur !== null) {
//       if (cur.value === value) {
//         return true
//       }
//       cur = cur.next
//     }
//     return false
//   }

//   getSize () {
//     return this.size
//   }

//   isEmpty () {
//     return this.size === 0
//   }

//   toString () {
//     let cur = this.dummyHead.next
//     let str = ""
//     while (cur !== null) {
//       str += cur.value + "->"
//       cur = cur.next
//     }
//     str += "null"
//     return str
//   }
// }

// function test() {
//   let n1 = new Node(1, null)
//   let n2 = new Node(4, null)
//   let n3 = new Node(3, null)
//   let n4 = new Node(2, null)

//   let list = new LinkedList()
//   list.addFirst(n1)
//   list.addFirst(n2)
//   list.addFirst(n3)
//   list.addFirst(n4)
//   console.log("链表初始化:", list.toString())

//   list.remove(3)
//   console.log("删除第三个元素:", list.toString())
// }

// test()


class Node {
  constructor (value, next) {
    this.value = value
    this.next = next
  }
}

class LinkedList {
  constructor () {
    this.dummyHead = new Node(null, null)
    this.size = 0
  }

  add () {
    
  }
}