/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
  let len = l1.length > l2.length ? l1.length : l2.length;
  let sum = carry = 0;
  let res = [];
  for (let i = 0; i <= len; i++) {
    if (i === len && carry === 0) {
      return res;
    } else if (i === len && carry !== 0) {
      console.log(i, carry)
      res[i] = carry;
      return res;
    }
    sum = l1[i] + l2[i] + carry
    res[i] = sum % 10;
    carry = Math.floor(sum / 10);
  }
  return res
}
let l1 = [2, 4, 3];
let l2 = [5, 6, 4];
// console.log(addTwoNumbers(l1, l2)); // [7, 0, 8]

function ListNode (val, next) {
  this.val = (val === undefined ? 0 : val)
  this.next = (next === undefined ? null : next)
}
var addTwoNumbers1 = function (l1, l2) {
  let head = null, tail = null;
  let carry = 0;
  while (l1 || l2) {
    const n1 = l1 ? l1.val : 0;
    const n2 = l2 ? l2.val : 0;
    const sum = n1 + n2 + carry;
    if (!head) {
      head = tail = new ListNode(sum % 10);
    } else {
      tail.next = new ListNode(sum % 10);
      tail = tail.next;
    }
    carry = Math.floor(sum / 10);
    if (l1) {
      l1 = l1.next;
    }
    if (l2) {
      l2 = l2.next;
    }
  }
  if (carry > 0) {
    tail.next = new ListNode(carry);
  }
  return head;
};
// console.log(addTwoNumbers1(
//   new ListNode(2, new ListNode(4, new ListNode(3))),
//   new ListNode(5, new ListNode(6, new ListNode(4)))
// ));

var addTwoNumbers2 = function (l1, l2) {
  let head = null, tail = null;
  let carry = 0;
  while (l1 || l2) {
    const n1 = l1 ? l1.val : 0;
    const n2 = l2 ? l2.val : 0;
    const sum = n1 + n2 + carry;
    // console.log(n1, n2, carry, sum)
    if (!head) {
      head = tail = new ListNode(sum % 10);
    } else {
      tail.next = new ListNode(sum % 10);
      tail = tail.next;
    }
    carry = Math.floor(sum / 10);
    if (l1) {
      l1 = l1.next;
    }
    if (l2) {
      l2 = l2.next;
    }
  }
  if (carry > 0) {
    tail.next = new ListNode(carry);
  }
  return head;
};
// console.log(addTwoNumbers1(l1, l2)); // [7, 0, 8]
console.log(addTwoNumbers2(
  new ListNode(2, new ListNode(4, new ListNode(3))),
  new ListNode(5, new ListNode(6, new ListNode(4)))
));
// ListNode {
// val: 7,
// next: ListNode { val: 0, next: ListNode { val: 8, next: null } }
// }

var addTwoNumbers3 = function (l1, l2, carry = 0) {
  let addOne = 0
  let sum = new ListNode('0')
  let head = sum
  while (addOne || l1 || l2) {
    let val1 = l1 !== null ? l1.val : 0
    let val2 = l2 !== null ? l2.val : 0
    let r1 = val1 + val2 + addOne
    addOne = r1 >= 10 ? 1 : 0
    sum.next = new ListNode(r1 % 10)
    sum = sum.next
    if (l1) l1 = l1.next
    if (l2) l2 = l2.next
  }
  return head.next
};
console.log(addTwoNumbers3(
  new ListNode(2, new ListNode(4, new ListNode(3))),
  new ListNode(5, new ListNode(6, new ListNode(4)))
));