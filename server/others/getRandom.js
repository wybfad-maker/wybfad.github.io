// IEEE 754标准的默认模式是最近舍入（舍入为最接近的偶数），它与四舍五入不同的是，对.5的舍入上采用取偶数的方式，即round - to - nearest - even，如：
// Round to nearest even：Round(0.5) = 0; Round(1.5) = 2; Round(2.5) = 2; Round(3.5) = 4;
// 即："四舍六入五取偶"
// “五取偶”的规则：当小数部分恰为0.5时，若个位是奇数则入，若个位是偶数则舍，总之让个位变成偶数。
// 得到一个大于等于0，小于1之间的随机数
function getRandom () {
  return Math.random();
}
// 得到一个两数之间的随机数
// 这个例子返回了一个在指定值之间的随机数。这个值不小于 min（有可能等于），并且小于（不等于）max。

function getRandomArbitrary (min, max) {
  return Math.random() * (max - min) + min;
}
// 得到一个两数之间的随机整数
// 这个例子返回了一个在指定值之间的随机整数。这个值不小于 min （如果 min 不是整数，则不小于 min 的向上取整数），且小于（不等于）max。

function getRandomInt (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //不含最大值，含最小值
}
// 也许很容易想到用 Math.round() 来实现，但是这会导致你的随机数处于一个不均匀的分布，这可能不符合你的需求。
// 得到一个两数之间的随机整数，包括两个数在内
// 上一个例子提到的函数 getRandomInt() 结果范围包含了最小值，但不含最大值。
// 如果你的随机结果需要同时包含最小值和最大值，怎么办呢 ? getRandomIntInclusive() 函数可以实现。

function getRandomIntInclusive (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //含最大值，含最小值 
}

// Math.random() 不能提供像密码一样安全的随机数字
// 不能使用它们来处理有关安全的事情。使用Web Crypto API 来代替, 和更精确的window.crypto.getRandomValues() 方法.
function getRandomBytes (length) {
  const array = new Uint8Array(length);
  window.crypto.getRandomValues(array);
  return array;
}

function getRandomHexString (length) {
  const array = getRandomBytes(length);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('');
}

function getRandomString (length) {
  const array = getRandomBytes(length);
  return Array.from(array, (byte) => String.fromCharCode(byte)).join('');
}
function getRandomBase64String (length) {
  const array = getRandomBytes(length);
  return btoa(String.fromCharCode.apply(null, array));
}

function getRandomUUID () {
  return getRandomHexString(16);
}

function getRandomPassword (length) {
  const array = getRandomBytes(length);
  return Array.from(array, (byte) => String.fromCharCode(byte % 36)).join('');
}

function getRandomNumber (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomBoolean () {
  return Math.random() < 0.5;
}
function getRandomDate (start, end) {
  return new Date(getRandomNumber(start.getTime(), end.getTime()));
}
function getRandomColor () {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
function getRandomImage (width, height) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = getRandomColor();
  ctx.fillRect(0, 0, width, height);
  return canvas.toDataURL();
}

function getRandomName () {
  const names = [
    'Alice', 'Bob', 'Charlie', 'David', 'Emily', 'Frank', 'Grace', 'Henry', 'Isabella', 'Jack', 'Kevin', 'Lily', 'Mia', 'Nancy', 'Olivia', 'Peter', 'Quincy', 'Rachel', 'Steve', 'Tina', 'Ursula', 'Victor', 'Wendy', 'Xavier', 'Yvonne', 'Zachary'
  ];
  return names[Math.floor(Math.random() * names.length)];
}

// 导出通用集成函数
export function useFnEffect () {
  return {
    getRandom,
    getRandomArbitrary,
    getRandomInt,
    getRandomIntInclusive,
    getRandomBytes,
    getRandomHexString,
    getRandomString,
    getRandomBase64String,
    getRandomUUID,
    getRandomPassword,
    getRandomNumber,
    getRandomBoolean,
    getRandomDate,
    getRandomColor,
    getRandomImage,
    getRandomName
  }
}


// 导出函数
export {
  getRandom,
  getRandomArbitrary,
  getRandomInt,
  getRandomIntInclusive,
  getRandomBytes,
  getRandomHexString,
  getRandomString,
  getRandomBase64String,
  getRandomUUID,
  getRandomPassword,
  getRandomNumber,
  getRandomBoolean,
  getRandomDate,
  getRandomColor,
  getRandomImage,
  getRandomName
};