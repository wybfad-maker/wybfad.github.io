function promiseFn () {
  return new Promise((res, rej) => {
    const successRate = Math.random();
    setTimeout(() => {
      if (successRate > 0.8) {
        res('success')
      }
      rej('fail')
    }, 1000)
  })
}
// promiseFn().then((data) => {
//   console.log(data)
// }).catch((err) => {
//   console.log(err)
// })

// # 1.Promise的用法及其代码实例
// Promise 是 JavaScript 中用于处理异步操作的一种方式。它允许你将异步操作封装成一个对象，使得代码更加简洁和易于管理。

// Promise 的基本结构如下：

// ```javascript
// new Promise((resolve, reject) => {
//   // 异步操作
//   if (success) {
//     resolve(value);
//   } else {
//     reject(error);
//   }
// });
// ```

// 其中，`resolve` 和 `reject` 是两个函数，分别用于处理异步操作成功和失败的情况。

// 例如，以下是一个简单的 Promise 实例：

// ```javascript
// function promiseFn() {
//   return new Promise((resolve, reject) => {
//     const successRate = Math.random();
//     setTimeout(() => {
//       if (successRate > 0.8) {
//         resolve('success');
//       } else {
//         reject('fail');
//       }
//     }, 1000);
//   });
// }
// promiseFn().then((data) => {
//   console.log(data);
// }).catch((err) => {
//   console.log(err);
// });
// ```

// 在这个例子中，`promiseFn` 函数返回一个 Promise 对象。Promise 对象在 1 秒后执行异步操作，如果操作成功，调用 `resolve` 函数并传递成功结果；如果操作失败，调用 `reject` 函数并传递失败原因。

// 然后，我们使用 `then` 方法处理 Promise 成功的情况，使用 `catch` 方法处理 Promise 失败的情况。
// # 2.Promise的链式调用及其代码实例
// Promise 的链式调用是指在 Promise 成功或失败的情况下，继续执行下一个 Promise 操作。这使得代码更加简洁和易于管理。

// 例如，以下是一个简单的 Promise 链式调用实例：

// ```javascript
// function promiseFn() {
//   return new Promise((resolve, reject) => {
//     const successRate = Math.random();
//     setTimeout(() => {
//       if (successRate > 0.8) {
//     resolve('success'); // 成功时，继续执行下一个 Promise 操作
//       } else {
//         reject('fail'); // 失败时，继续执行下一个 Promise 操作
//       }
//     }, 1000);
//   });
// }
// promiseFn().then((data) => {
//   console.log(data);
//   return 'next data'; // 返回下一个 Promise 操作的值
// }).then((nextData) => {
//   console.log(nextData);
// }).catch((err) => {
//   console.log(err);
// });
// ```
// 在这个例子中，`promiseFn` 函数返回一个 Promise 对象。Promise 对象在 1 秒后执行异步操作，如果操作成功，调用 `resolve` 函数并传递成功结果；如果操作失败，调用 `reject` 函数并传递失败原因。
// 然后，我们使用 `then` 方法处理 Promise 成功的情况，使用 `catch` 方法处理 Promise 失败的情况。在 Promise 成功的情况下，继续执行下一个 Promise 操作，并返回下一个 Promise 操作的值。在 Promise 失败的情况下，继续执行下一个 Promise 操作，并返回下一个 Promise 操作的值。
// # 3.Promise的并行调用及其代码实例
// Promise 的并行调用是指在多个 Promise ��并行执行的情况下，等待所有 Promise 操作完成后再执行后续操作。这使得代码更加高效和易于管理。

// 例如，以下是一个简单的 Promise 并行调用实例：

// ```javascript
// function promiseFn1() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve('success1');
//     }, 1000);
//   });
// }
// function promiseFn2() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve('success2');
//     }, 2000);
//   });
// }
// Promise.all([promiseFn1(), promiseFn2()]).then((results) => {
//   console.log(results);
// });
// ```
// 在这个例子中，`promiseFn1` 和 `promiseFn2` 函数分别返回一个 Promise 对象。Promise 对象在 1 秒和 2 秒后执行异步操作，如果操作成功，调用 `resolve` 函数并传递成功结果；如果操作失败，调用 `reject` 函数并传递失败原因。
// 然后，我们使用 `Promise.all` 方法并行执行这两个 Promise 操作。当所有 Promise 操作完成时，调用 `then` 方法并传递所有 Promise 操作的结果。
