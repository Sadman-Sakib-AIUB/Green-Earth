1) Difference between var, let, and const

var → Old way of declaring variables.It can be re-declared and updated.

let → It has block scope (limited inside {}). It can be updated but not re-declared in the same scope.

const → Same block scope as let, but cannot be updated or re-declared (value is constant).

2) Difference between map(), forEach(), and filter()

map() → Creates a new array with results after applying a function.

forEach() → Just loops over items, does not return anything new.

filter() → Creates a new array with items that match a condition.

3) Arrow Functions in ES6

Arrow functions are a shorter way to write functions.
Normal function:
function add(a, b) {
  return a + b;
}

Arrow function:
let add = (a, b) => a + b;

4) Destructuring Assignment in ES6

It let us unpack values from arrays or objects into variables easily.
- array
`let arr = [10, 20, 30];
let [x, y, z] = arr;
console.log(x, y, z);`
- object
`let person = {name: "Ali", age: 22};
let {name, age} = person;
console.log(name, age); // Ali 22`

5) Template Literals in ES6

Template literals allow you to write strings with backticks (`).
They make it easier to add variables and write multi-line strings.


