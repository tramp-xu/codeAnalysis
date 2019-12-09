function ListNode(val){
  this.val = val;
  this.next = null;
}
var a = new ListNode(4);
a.next = new ListNode(5);
a.next.next = new ListNode(1);
a.next.next.next = new ListNode(9);

console.log(a)

var deleteNode = function(node) {
  node.val = node.next.val
  node.next = node.next.next  
};