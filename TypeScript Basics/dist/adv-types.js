"use strict";
const e1 = {
    name: 'Max', privileges: ['create-server'], id: 1234
};
function addd(a, b) {
    // type_gaurd using 'typeof'
    if (typeof a === 'string' || typeof b === 'string')
        return a.toString() + b.toString();
    return a + b;
}
function printEmpInfo(emp) {
    // using 'in' keyword
    if ('privileges' in emp) {
        console.log('Privileges:-' + emp.privileges);
    }
    if ('name' in emp) {
        console.log('name:-' + emp.name);
    }
}
function moveAnimal(animal) {
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
const userInputElement = document.getElementById('input-ex');
// userInputElement.value = 'Hi there!!!';
userInputElement.value = 'Hi there!!!';
const errorBag = {
    id: 'ab123',
    email: "Not a valid email",
    password: "password is weak"
};
// Optional Chaining - using '?' as null check
// jsonObj.data?.emp?.roll
// Nullish Coalescing
const userInput = '';
const storeData = userInput || "DEFAULT"; // works IF userInput = null / undefined / ''
const storeData2 = userInput !== null && userInput !== void 0 ? userInput : "DEFAULT"; // works ONLY IF userInput = null or undefined
// 'keyof' Constraints
function extractObject(obj, key) {
    console.log("Value:- " + obj[key]);
}
extractObject({ 'name': 'pappu' }, 'name');
// Generic classes
class DataStorage {
    constructor() {
        this.data = [];
    }
    addItem(item) { this.data.push(item); }
    removeItem(item) {
        if (this.data.indexOf(item) === -1)
            return;
        this.data.splice(this.data.indexOf(item), 1);
    }
    getItems() { return [...this.data]; }
}
const numDataStorage = new DataStorage();
function createPeopleObj() {
    // 'Partial' makes each property as optional
    const peopleObj = {};
    peopleObj.name = 'pappu';
    peopleObj.age = 12;
    peopleObj.roll = 1234;
    return peopleObj;
}
// 'Readonly' Generic type
const flagsConsts = ['true', 'false'];
// flagsConsts.push("maybe") // not allowed
// flagsConsts.pop // not allowed
//# sourceMappingURL=adv-types.js.map