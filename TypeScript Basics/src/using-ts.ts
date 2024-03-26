
// enum
enum enumEx { ADMIN, READ_ONLY = 9, AUTHOR }

// alias
type Combinable = number | string;

// object, arrays, tuple, "union types"
const person: {
    name: string;
    // age: number | string;
    age: Combinable;
    hobbies: string[];
    role: number;
    // role: [string, number];
} = {
    name: "pappu",
    age: 30,
    hobbies: ["TV", "chess", "singing"],
    role: enumEx.ADMIN
}
//resultSet - literal types
// return types
function add(number1: number, number2: number, resultSet: 'ADDING' | 'CONCAT'): number {
    console.log(resultSet + "----");
    return number1 + number2;
}

// function type
const modifiedAdd = add;
let anotherEx: (a: number, b: number, cb: () => void) => string;
if (person.role === enumEx.ADMIN)
    console.log("Person is ADMIN");
 
    // handle click
function handleClick() {
    alert("CLICKED22")
    console.log("hello");
}
console.log(add(2, 5, 'CONCAT')); 
