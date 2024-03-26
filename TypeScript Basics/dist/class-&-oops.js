"use strict";
//abstract 
class Department {
    // private id:string;
    // private name:string;
    // private noOfEmp:number;
    set setName(newName) {
        this.name = newName;
    }
    get getName() {
        return this.name;
    }
    constructor(id, name, employees) {
        this.id = id;
        this.name = name;
        this.employees = employees;
    }
    addEmployee(name) {
        this.employees.push(name);
    }
    // abstract describe(this: Department): void;
    describe() {
        console.log(`id=${this.id} - name=${this.name}`);
    }
}
class ITDept extends Department {
    constructor(id, reports) {
        super(id, "IT", []);
        this.reports = reports;
        this.lastReport = reports[0];
    }
    // overriding
    describe() {
        console.log(`IT DEPT id=${this.id} - name=${this.getName}`);
    }
}
// singleton & private constructor
class AccDept extends Department {
    // private constructor
    constructor(id, reports) {
        super(id, "IT", []);
        this.reports = reports;
    }
    // gives instance once
    static getInstance(str) {
        if (!AccDept.instance) {
            this.instance = new AccDept(str, []);
        }
        return this.instance;
    }
}
const depObj = new Department("ab12", "IT", ["MANU", "PAPPU"]);
console.log(depObj);
console.log("--setting--" + depObj.setName + "==" + depObj.getName);
// why using 'this' keyword in function declaration??
const copyDept = { desc: depObj.describe };
// console.log("calling describe from copy obj without using 'this' in desc ", copyDept.desc()); // got undefined
//  to fix this this should be passed in describe
//using spread op
const { getName: tempName } = depObj;
console.log("got the value by spread op==", tempName);
// creating an instance of a singleton class
const accObj = AccDept.getInstance("HULULUL");
const accObj2 = AccDept.getInstance("LULULU");
console.log("singleton instances - ", accObj, "- && -", accObj2);
// using class with interface
class Person {
    constructor(n) {
        this.name = n;
    }
    greet(phrase) {
        console.log(phrase + " " + this.name);
    }
}
let user1 = new Person("MAX");
user1.greet("Hi there, ");
//# sourceMappingURL=class-&-oops.js.map