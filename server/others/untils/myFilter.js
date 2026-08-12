// 各种过滤方法

// 字符串过滤方法
function filterString (str, filterFn) {
  return str.split('').filter(filterFn).join('');
}

// 示例用法
const str = "Hello, World!";
const filteredStr = filterString(str, function (char) {
  return char !== 'o';
});

console.log(filteredStr); // 输出: "Hll, Wrld!"


// 数组过滤方法
function filterArray (arr, filterFn) {
  return arr.filter(filterFn);
}

// 示例用法
const words = ["apple", "banana", "cherry", "date"];
const shortWords = filterArray(words, function (word) {
  return word.length <= 5;
});

console.log(shortWords); // 输出: ["apple", "date"]

// 对象过滤方法
function filterObject (obj, filterFn) {
  return Object.keys(obj).filter(key => filterFn(obj[key])).reduce((acc, key) => {
    acc[key] = obj[key];
    return acc;
  }, {});
}

// 示例用法
const person = {
  name: "Alice",
  age: 30,
  city: "New York"
};

const filteredPerson = filterObject(person, function (value) {
  return typeof value === 'string';
});


console.log(filteredPerson); // 输出: { name: 'Alice', city: 'New York' }

// 过滤方法的组合使用
function filterCombined (str, filterFn1, filterFn2) {
  return filterString(str, function (char) {
    return filterFn1(char) && filterFn2(char);
  });
}

// 示例用法
const combinedStr = filterCombined(str, function (char) {
  return char !== 'o';
}, function (char) {
  return char !== 'l';
});

console.log(combinedStr); // 输出: "Hll, Wrld!"


// 过滤方法的递归使用
function filterRecursive (arr, filterFn) {
  return arr.filter(filterFn).map(item => {
    if (Array.isArray(item)) {
      return filterRecursive(item, filterFn);
    }
    return item;
  });
}

// 示例用法
const nestedArray = [1, 2, [3, 4, [5, 6]], 7];
const filteredNestedArray = filterRecursive(nestedArray, function (item) {
  return item % 2 === 0;
});

console.log(filteredNestedArray); // 输出: [2, 4, 6]
});

console.log(filteredNestedArray); // 输出: [2, 4, 6, 8]

// 过滤方法的链式使用
function filterChain (str, filterFn1, filterFn2, filterFn3) {
  return filterString(str, function (char) {
    return filterFn1(char) && filterFn2(char) && filterFn3(char);
  });
}

// 示例用法
const chainedStr = filterChain(str, function (char) {
  return char !== 'o';
}, function (char) {
  return char !== 'l';
}, function (char) {
  return char !== 'e';
});

console.log(chainedStr); // 输出: "Hll, Wrld!"

