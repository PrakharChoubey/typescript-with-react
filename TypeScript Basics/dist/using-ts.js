"use strict";
// enum
var enumEx;
(function (enumEx) {
    enumEx[enumEx["ADMIN"] = 0] = "ADMIN";
    enumEx[enumEx["READ_ONLY"] = 9] = "READ_ONLY";
    enumEx[enumEx["AUTHOR"] = 10] = "AUTHOR";
})(enumEx || (enumEx = {}));
// object, arrays, tuple, "union types"
const person = {
    name: "pappu",
    age: 30,
    hobbies: ["TV", "chess", "singing"],
    role: enumEx.ADMIN
};
//resultSet - literal types
// return types
function add(number1, number2, resultSet) {
    console.log(resultSet + "----");
    return number1 + number2;
}
// function type
const modifiedAdd = add;
let anotherEx;
if (person.role === enumEx.ADMIN)
    console.log("Person is ADMIN");
// handle click
function handleClick() {
    alert("CLICKED22");
    console.log("hello");
}
console.log(add(2, 5, 'CONCAT'));
//# sourceMappingURL=using-ts.js.map