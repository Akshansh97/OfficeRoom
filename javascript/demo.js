// // let arr = [1, 3, 4, 6, 9];

// // function consecutive(arr) {
// //    // Your code goes here
// //    let min = arr[0];
// //    let max = arr[0];
// //    let count = 0;

// //    for (let i = 0; i < arr.length; i++) {
// //       count++;
// //       if (arr[i] < min) {
// //          min = arr[i];
// //       }
// //       if (arr[i] > max) {
// //          max = arr[i];
// //       }
// //    }
// //    let total = max - min + 1;
// //    let missing = total - count;
// //    console.log(total);
// //    console.log(count);
// //    console.log(min, max);
// //     console.log(missing);

// // }
// // consecutive(arr);


// let col = "ZY";
// let r = 0;
// for(let i = 0; i < col.length; i++){
//    let alph = col.charCodeAt(i) - 64;
//    r = r * 26 + alph; 

// }
//  console.log(r,NaN + "a");
// console.log(typeof(NaN + NaN));
// console.log(String(undefined));
// let n1 = 9, n2 = 4, n3 = 6;
// console.log((n1 > n2) ? ((n1 > n3) ? n1 : n3) : ((n2 > n3) ? n2 : n3))
// // (n1 > n2) ? ((n1 > n3) ? n1 : n3) : ((n2 > n3) ? n2 : n3);


// var customer = new Object();
// customer.firstname = "Akshansh";
// customer.lastname = "Dubey";
// customer.mobile = 9399151219;
// customer.location = "Indore";

// console.log(customer);

// console.log(customer.firstname + " " + customer.lastname);

// var product = {
//    productName : 'Executive Chair',
//    productId : '001'
// };
// product.status = "dispatched";
// product.productId = "01";
// console.log(product);

// console.log(product.productName + "(" + product.productId + ") is " + product.status);

// function multiply(num) {
//    console.log("dubey");
//    return ("hello \n" + (num * num));
//    console.log("akshansh");
// }
// console.log();
// var answer = multiply(4);

// console.log(typeof (answer), answer);
console.log("\n\n\n****************problem****************\n\n\n");
console.log("\n\n\n****************obj1****************\n\n\n");
var obj1 = {
   "name": "John",
   "age": 30,
   "address": {
      "city": "Indore",
      "pincode": "452009",
      "state": "Madhya Pradesh",
      "country": "India"
   }
};
console.log(JSON.stringify(obj1, null, 1));
console.log("\n\n\n****************obj2****************\n\n\n");
var obj2 = {
   "name": "James",
   "isStudent": true,
   "age": 25,
   "mobile": "+91 9399151219"
};
console.log(JSON.stringify(obj2, null, 1));
console.log("\n\n\n****************obj3****************\n\n\n");
var obj3 = new Object();
obj3.name = "Akshansh";
obj3.age = 28;
obj3.isStudent = false;
obj3.address = {
   "city": "Indore",
   "apartment": "3288",
   "landmark": "Gopur Square"
};
console.log(JSON.stringify(obj3, null, 1));

console.log("\n\n\n****************result****************\n\n\n");
var result = {};
for (var key in obj1) {
   result[key] = obj1[key];
}

console.log("\n\n*********first for-in loop*********\n\n" + JSON.stringify(result, null, 1));

for (var key1 in obj2) {
   result[key1] = obj2[key1];
}

console.log("\n\n*********second for-in loop*********\n\n" + JSON.stringify(result, null, 1));

for (var key in obj3) {
   if (key === 'address' && typeof result.address === 'object') {
      for (let childKey in obj3.address) {
         result.address[childKey] = obj3.address[childKey];
      }
   } else {
      result[key] = obj3[key];
   }
}
console.log("\n\n*********final result*********\n\n" + JSON.stringify(result, null, 1));

// var func = (function () {
//    return n * n;
// })();
// console.log(func);

for (var n = 1; n <= 5; n++) {
   for (var i = 1; i <= 10; i++) {
      if (i < 10) {
         console.log(n + " * " + i + "  = " + n * i);
      } else {
         console.log(n + " * " + i + " = " + n * i);
      }
   }
   console.log("*************");
}
console.log('first', result)

console.log("first");

const add = (n1,n2) => { return n1*n2 };
const results = add(5,4);
console.log(results);