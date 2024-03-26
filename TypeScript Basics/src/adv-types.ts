type Admin = {
    privileges: string[];
}

type Emp = {
    name: string;
    id: number;
}

// intersection types
type ElevatedEmp = Admin & Emp;

const e1: ElevatedEmp = {
    name: 'Max', privileges: ['create-server'], id: 1234
}

// Type Gaurds

// Example 1
type Combinable2 = number | string;

// function overloads
function addd(a: number, b: number): number;
function addd(a: string, b: string): string;
function addd(a: string, b: number): string;
function addd(a: number, b: string): string;
function addd(a: Combinable2, b: Combinable2) {
    // type_gaurd using 'typeof'
    if (typeof a === 'string' || typeof b === 'string')
        return a.toString() + b.toString();
    return a + b;
}

// Example 2
type unknownEmp = Emp | Admin;

function printEmpInfo(emp: unknownEmp) {
    // using 'in' keyword
    if ('privileges' in emp) {
        console.log('Privileges:-' + emp.privileges);
    }
    if ('name' in emp) {
        console.log('name:-' + emp.name);
    }
}

// Example 3
// when working with classes, using 'instanceof'  

// Example 4 - discriminated unions
// by using a common property in all the classes in the union

interface Bird {
    // discriminated unions
    type: 'bird';
    flyingSpeed: number;
}

interface Horse {
    // discriminated unions
    type: 'horse';
    runningSpeed: number;
}

type Animal = Bird | Horse

function moveAnimal(animal: Animal) {
    let speed;
    switch (animal.type) {
        case 'bird':
            speed = animal.flyingSpeed;
            break;
        case 'horse':
            speed = animal.runningSpeed;
            break;
        default:
            break;
    }
    console.log("Moving at speed:" + speed);

}

// Type casting
// const userInputElement = <HTMLInputElement>document.getElementById('input-ex')!;9
const userInputElement = document.getElementById('input-ex')! as HTMLInputElement;

// userInputElement.value = 'Hi there!!!';
(userInputElement as HTMLInputElement).value = 'Hi there!!!';


// Index Properties
interface ErrorContainer {
    id: string;
    // when unsure about the key/property_name, but the value type is known
    [prop: string]: string;
}

const errorBag: ErrorContainer = {
    id: 'ab123',
    email: "Not a valid email",
    password: "password is weak"
}

// Optional Chaining - using '?' as null check
// jsonObj.data?.emp?.roll

// Nullish Coalescing
const userInput = ''
const storeData = userInput || "DEFAULT"; // works IF userInput = null / undefined / ''
const storeData2 = userInput ?? "DEFAULT"; // works ONLY IF userInput = null or undefined


// 'keyof' Constraints
function extractObject<T extends object, U extends keyof T>(obj: T, key: U): void {

    console.log("Value:- " + obj[key]);

}
extractObject({ 'name': 'pappu' }, 'name')

// Generic classes
class DataStorage<T extends number | string | boolean>{
    private data: T[] = [];

    addItem(item: T) { this.data.push(item); }

    removeItem(item: T) {
        if (this.data.indexOf(item) === -1)
            return;
        this.data.splice(this.data.indexOf(item), 1)
    }

    getItems() { return [...this.data]; }
}

const numDataStorage = new DataStorage<number | string>();
// <object> gives compilation error
// const objDataStorage = new DataStorage<object>();

// 'Partial' Generic type
interface exPeople {
    name: string;
    age: number;
    roll: number;
}
function createPeopleObj(): exPeople {
    // 'Partial' makes each property as optional
    const peopleObj: Partial<exPeople> = {}
    peopleObj.name = 'pappu';
    peopleObj.age = 12;
    peopleObj.roll = 1234;
    return peopleObj as exPeople;
}

// 'Readonly' Generic type
const flagsConsts: Readonly<string[]> = ['true', 'false'];
// flagsConsts.push("maybe") // not allowed
// flagsConsts.pop // not allowed