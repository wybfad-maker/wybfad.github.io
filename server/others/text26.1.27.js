function funArr (arr) {
  console.log(arr.at(2));
  console.log(arr.splice(2, 1, 66), arr);
  console.log(arr.reverse(), arr);
  console.log(arr, arr);
  console.log(arr.sort((a, b) => a - b), arr);
}
// funArr([1, 2, 3, 4, 5, 8]);
// funArr([1, 5, 3, 2, 4, 9]);
const users = [
  { id: 1, name: 'Alex', age: 20, sex: 'man', habits: {}, profile: { img: '0.png' } },
  { id: 2, name: 'Bob', age: 25, sex: 'man', habits: {}, profile: null },
  { id: 3, name: 'Charlie', age: 30, man: 'woman', habits: {}, profile: null }
];
// console.log(users.find((it)=>it.name=='Bob'))