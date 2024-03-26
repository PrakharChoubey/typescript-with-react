//abstract 
class Department {
    // private id:string;
    // private name:string;
    // private noOfEmp:number;
    set setName(newName: string) {
        this.name = newName;
    }

    get getName() {
        return this.name;
    }

    constructor(protected readonly id: string, private name: string, private employees: string[]) {

    }

    addEmployee(this: Department, name: string) {
        this.employees.push(name);
    }

    // abstract describe(this: Department): void;
    describe(this: Department) {
        console.log(`id=${this.id} - name=${this.name}`);
    }
}

class ITDept extends Department {
    private lastReport: string;

    constructor(id: string, private reports: string[]) {
        super(id, "IT", []);
        this.lastReport = reports[0];
    }

    // overriding
    describe(this: ITDept): void {
        console.log(`IT DEPT id=${this.id} - name=${this.getName}`);
    }
}

// singleton & private constructor
class AccDept extends Department {
    private static instance: AccDept;

    // private constructor
    private constructor(id: string, private reports: string[]) {
        super(id, "IT", []);
    }

    // gives instance once
    static getInstance(str: string) {
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
const copyDept = { desc: depObj.describe }
// console.log("calling describe from copy obj without using 'this' in desc ", copyDept.desc()); // got undefined
//  to fix this this should be passed in describe



//using spread op
const { getName: tempName } = depObj
console.log("got the value by spread op==", tempName)

// creating an instance of a singleton class
const accObj = AccDept.getInstance("HULULUL");
const accObj2 = AccDept.getInstance("LULULU");

console.log("singleton instances - ", accObj, "- && -", accObj2)

//// INTERFACES ////

interface Greetable {
    name: string;
    // optional property
    output?: string;

    // only definition
    greet(phrase: string): void;

    // optional function
    greeting?():void;
}

// using class with interface
class Person implements Greetable {
    name: string;
    age?:number;

    constructor(n: string) {
        this.name = n;
    }

    greet(phrase: string): void {
        console.log(phrase + " " + this.name);
    }
}

let user1 = new Person("MAX");
user1.greet("Hi there, ")

// using function type
type AddFn = (a: number, b: number) => number;

// alternative for type, using interface
interface AddFn2 {
    // like anonymous function declaration
    (a: number, b: number): number;
}