// 类型检查的几种方式
// 1. typeof
// 2. instanceof
// 3. constructor
// 4. Object.prototype.toString.call()

// typeof
function checkType1 (value) {
  return typeof value === 'number';
}

// instanceof
function checkType2 (value) {
  return value instanceof Number;
}

// constructor
function checkType3 (value) {
  return value.constructor === Number;
}

// Object.prototype.toString.call()
function checkType4 (value) {
  return Object.prototype.toString.call(value) === '[object Number]';
}

// 测试
console.log(checkType1(1)); // true
console.log(checkType2(1)); // false
console.log(checkType3(1)); // false
console.log(checkType4(1)); // false

// 校验输入类型为字符串且输入字符串包含某段字符串
function validateInput (input) {
  if (typeof input !== 'string' || !input.includes('example')) {
    return false;
  }
  return true;
}
// 使用校验函数
const userInput = 'This is an example string.';
if (validateInput(userInput)) {
  console.log('Input is valid.');
} else {
  console.log('Input is invalid.');
}

//校验输入类型为字符串且输入字符串,Object方法
function validateObject (input) {
  console.log(Object.prototype.toString.call(input));
  //判断是否为对象类型
  // if (typeof input === 'object' && !Array.isArray(input)) return true;
  if (Object.prototype.toString.call(input) === '[object Object]') return true;
  return false;
}
// 使用校验函数
const userObject = { name: 'Alisa', age: 28 };
if (validateObject(userObject)) {
  console.log('Input is valid.');
} else {
  console.log('Input is invalid.');
}
console.log(Object.prototype.toString.call('Alisa'));

// 验证密码
// 1. 输入密码格式错误
// 2. 密码错误
// 3. 密码缺少
// 4. 密码正确
// 5. 密码过于简单
function testPWD (pwd) {
  const PWD = 32345
  let pwdstat = {
    '-2': '输入密码格式错误',
    '-1': '密码错误',
    '0': '密码缺少',
    '1': '密码正确',
    '2': '密码过于简单'
  }
  function checkInput (ipt) {
    if (Object.prototype.toString.call(ipt) !== '[object String]') return '-2';
    if (ipt.includes(PWD)) return '1';
    return '-1'
  }
  console.log(pwdstat?.[checkInput(pwd)]);
  return pwd;
}
testPWD('232345122')
testPWD('236345122')
testPWD([236345122])
console.log(Object.prototype.toString.call([566]))


// 验证邮箱
// 1. 输入邮箱格式错误
// 2. 邮箱错误
// 3. 邮箱缺少
// 4. 邮箱正确
function testEmail (email) {
  const EMAIL = '123456789@qq.com'
  let emailstat = {
    '-2': '输入邮箱格式错误',
    '-1': '邮箱错误',
    '0': '邮箱缺少',
    '1': '邮箱正确',
    '2': '邮箱过于简单'
  }
  function checkInput (ipt) {
    if (Object.prototype.toString.call(ipt) !== '[object String]') return '-2';
    if (ipt.includes(EMAIL)) return '1';
    return '-1'
  }
  console.log(emailstat?.[checkInput(email)]);
  return email;
}
testEmail('123456789@qq.com')

// 验证手机号
// 1. 输入手机号格式错误
// 2. 手机号错误
// 3. 手机号缺少
// 4. 手机号正确
function testPhone (phone) {
  const PHONE = '13800138000'
  let phonestat = {
    '-2': '输入手机号格式错误',
    '-1': '手机号错误',
    '0': '手机号缺少',
    '1': '手机号正确'
  }
  function checkInput (ipt) {
    if (Object.prototype.toString.call(ipt) !== '[object String]') return '-2';
    if (ipt.includes(PHONE)) return '1';
    return '-1'
  }
  console.log(phonestat?.[checkInput(phone)]);
  return phone;
}
testPhone('13800138000')

// 验证身份证号
// 1. 输入身份证号格式错误
// 2. 身份证号错误
// 3. 身份证号缺少
// 4. 身份证号正确
function testID (id) {
  const ID = '110105199001010001'
  let idstat = {
    '-2': '输入身份证号格式错误',
    '-1': '身份证号错误',
    '0': '身份证号缺少',
    '1': '身份证号正确'
  }
  function checkInput (ipt) {
    if (Object.prototype.toString.call(ipt) !== '[object String]') return '-2';
    if (ipt.includes(ID)) return '1';
    return '-1'
  }
  console.log(idstat?.[checkInput(id)]);
  return id;
}
testID('110105199001010001')

// 验证银行卡号
// 1. 输入银行卡号格式错误
// 2. 银行卡号错误
// 3. 银行卡号缺少
// 4. 银行卡号正确
function testBank (bank) {
  const BANK = '6221520100000000000'
  let bankstat = {
    '-2': '输入银行卡号格式错误',
    '-1': '银行卡号错误',
    '0': '银行卡号缺少',
    '1': '银行卡号正确'
  }
  function checkInput (ipt) {
    if (Object.prototype.toString.call(ipt) !== '[object String]') return '-2';
    if (ipt.includes(BANK)) return '1';
    return '-1'
  }
  console.log(bankstat?.[checkInput(bank)]);
  return bank;
}
testBank('6221520100000000000')
// 验证日期
// 1. 输入日期格式错误
// 2. 日期错误
// 3. 日期缺少
// 4. 日期正确
function testDate (date) {
  const DATE = '2023-01-01'
  let datestat = {
    '-2': '输入日期格式错误',
    '-1': '日期错误',
    '0': '日期缺少',
    '1': '日期正确'
  }
  function checkInput (ipt) {
    if (Object.prototype.toString.call(ipt) !== '[object String]') return '-2';
    if (ipt.includes(DATE)) return '1';
    return '-1'
  }
  console.log(datestat?.[checkInput(date)]);
  return date;
}
testDate('2023-01-01')

// 验证金额
// 1. 输入金额格式错误
// 2. 金额错误
// 3. 金额缺少
// 4. 金额正确
function testMoney (money) {
  const MONEY = '100.00'
  let moneystat = {
    '-2': '输入金额格式错误',
    '-1': '金额错误',
    '0': '金额缺少',
    '1': '金额正确'
  }
  function checkInput (ipt) {
    if (Object.prototype.toString.call(ipt) !== '[object String]') return '-2';
    if (ipt.includes(MONEY)) return '1';
    return '-1'
  }
  console.log(moneystat?.[checkInput(money)]);
  return money;
}
testMoney('100.00')

// 验证密码
// 1. 输入密码格式错误
// 2. 密码错误
// 3. 密码缺少
// 4. 密码正确
// 5. 密码过于简单
function testPWD (pwd) {
  const PWD = '123456789'
  let pwdstat = {
    '-2': '输入密码格式错误',
    '-1': '密码错误',
    '0': '密码缺少',
    '1': '密码正确',
    '2': '密码过于简单'
  }
  function checkInput (ipt) {
    if (Object.prototype.toString.call(ipt) !== '[object String]') return '-2';
    if (ipt.includes(PWD)) return '1';
    return '-1'
  }
  console.log(pwdstat?.[checkInput(pwd)]);
  return pwd;
}
testPWD('123456789')
testPWD('1234567890')
testPWD([123456789])
