// function myFunc({a, b}) { console.log(a, b); } myFunc({a: 1, b: 2});
//const object1 = { property1: 20 }; console.log(Object.is(object1));

//var materials = [ 'Table', 'Chair', 'Boxes', 'Press' ]; console.log(materials.map(material => material.length));
// const prototype1 = {}; const object1 = Object.create(prototype1); console.log(Object.getPrototypeOf(object1) === prototype1);
// var add=new Function("num1","num2","return num1+num2"); console.log(add(2,5));
// var string2Num=parseInt("123xyz");
// console.log(string2Num)

// const object1 = {};
// a = Symbol("a");
// b = Symbol.for("b");
// object1[a] = "harry";
// object1[b] = "derry";
// const objectSymbols = Object.getOwnPropertySymbols(object1);
// console.log(objectSymbols.length);

//  function sayHi() { return (() => 0)(); } console.log(typeof sayHi());

// const obj1 = { property1: 2 }; Object.seal(obj1); obj1.property1 =4; console.log(obj1.property1); delete obj1.property1;

// const pt1 = {}; const ob1 = Object.create(pt1); console.log( Object.getPrototypeOf(ob1) === pt1 );

// var count = [1,,3]
// console.log(count)

function winorlose(s) {
  // Your code goes here
  let count1 = 0,
    count2 = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === 1) {
      count1++;
    } else count2++;
  }
  if (count1 > count2) {
    return "WIN";
  } else return "LOSE";
}

//console.log(winorlose("0101111111111"));


// const regex = /[amn]/; const string = "abcd";
// console.log(regex.test(string));

const str = "123-456-789";
const result = str.split(/-/);
//console.log(result);

const regex = /[^abc]/;
const string = "aemngq";
//console.log(regex.test(string));

var arr = [3,5,8];
let plus_one = arr.map(n=> n+1);
console.log(plus_one);