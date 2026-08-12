// 类型检查的几种方式
// 1. typeof
// 2. instanceof
// 3. constructor
// 4. Object.prototype.toString.call()
// 5. Reflect.ownKeys()

// typeof
function checkTypeByTypeof (value: any, type: string = null) {
  // typeof 返回的是字符串，所以需要进行类型转换
  // 例如：typeof 1 === 'number'，typeof '1' === 'string'，typeof true === 'boolean'，typeof null === 'object'，typeof undefined === 'undefined'，typeof Symbol() === 'symbol'，typeof function () {} === 'function'，typeof [] === 'object'，typeof {} === 'object'，typeof new Date() === 'object'，typeof new Error
  if (!type) return (typeof value);
  return typeof value === type;
}

// instanceof
function checkTypeByInstanceof (value: any, type: any = null) {
  // instanceof 返回的是布尔值，所以不需要进行类型转换
  // 例如：1 instanceof Number === true，'1' instanceof Number === false，true instanceof Number === false，null instanceof Number === false，undefined instanceof Number === false，Symbol() instanceof Number === false，function () {} instanceof Number === false，[] instanceof Number === false，{} instanceof Number === false，new Date() instanceof Number === false，new Error instanceof Number === false
  if (!type) return false;
  return value instanceof type;
}

// constructor
function checkTypeByConstructor (value: any, type: any = null) {
  // constructor 返回的是函数，所以不需要进行类型转换
  // 例如：1.constructor === Number === true，'1'.constructor === String === false，true.constructor === Boolean === false，null.constructor === Object === false，undefined.constructor === Object === false，Symbol().constructor === Symbol === false，function () {}.constructor === Function === true，[].constructor === Array === true，{}.constructor === Object === true，new Date().constructor === Date === true，new Error.constructor === Error === true
  if (!type) return value.constructor;
  return value.constructor === type;
}

// Object.prototype.toString.call()
// Object.prototype.toString.call() 返回的是字符串，所以不需要进行类型转换
// 例如：Object.prototype.toString.call(1) === '[object Number]'，Object.prototype.toString.call('1') === '[object String]'，Object.prototype.toString.call(true) === '[object Boolean]'，Object.prototype.toString.call(null) === '[object Null]'，Object.prototype.toString.call(undefined) === '[object Undefined]'，Object.prototype.toString.call(Symbol()) === '[object Symbol]'，Object.prototype.toString.call(function
function checkTypeByObjectToStringCall (value: any, type: any = null) {
  if (!type) return Object.prototype.toString.call(value);
  return Object.prototype.toString.call(value) === `[object ${type}]`;
}

// Reflect.ownKeys()
// Reflect.ownKeys() 返回的是数组，所以不需要进行类型转换
// 例如：Reflect.ownKeys(1) === ['constructor']，Reflect.ownKeys('1') === ['length']，Reflect.ownKeys(true) === ['constructor']，Reflect.ownKeys(null) === ['constructor']，Reflect.ownKeys(undefined) === ['constructor']，Reflect.ownKeys(Symbol()) === ['constructor']，Reflect.ownKeys(function () {}) === ['constructor']，Reflect.ownKeys([]) === ['length']，Reflect.ownKeys({}) === ['constructor']，Reflect.ownKeys(new Date()) === ['constructor']，Reflect.ownKeys(new Error()) === ['constructor']
function checkTypeByReflect (value: any, type: any = null) {
  if (!type) return Reflect.ownKeys(value);
  return Reflect.ownKeys(value) === type;
}

// 总结：typeof、instanceof、constructor、Object.prototype.toString.call()、
// Reflect.ownKeys() 这些方法都可以用来检查变量的类型，
// 但它们的使用场景和返回值有所不同。typeof 只能检查变量的类型，
// instanceof 只能检查变量是否是某个类的实例，
// constructor 只能检查变量的构造函数，
// Object.prototype.toString.call() 可以检查变量的类型，
// Reflect.ownKeys() 可以检查变量的属性。

export default {
  checkTypeByTypeof,
  checkTypeByInstanceof,
  checkTypeByConstructor,
  checkTypeByObjectToStringCall,
  checkTypeByReflect
};
