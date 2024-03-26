// Best example of decorator is @Component in angular
// look like this : - 
// @Component({
//   selector: 'app-component-overview',
//   templateUrl: './component-overview.component.html',
//   styleUrls: ['./component-overview.component.css']
// })

// decorator's names starts with capital letter
// decorators are called, when class gets defined
function Logger(target: Function) {
    console.log("Logging......");
    console.log(target);
    console.log("Logging Ends Here......");
}

@Logger
class Person2 {
    name: string = 'MAX';

    constructor() {
        console.log("creating Person oject...");
    }
}

const pers = new Person2();
console.log(pers);

// working with decorators Factories
function Logger2(targetName: string) {
    return (targetConstructor: Function) => {
        console.log("Logging--" + targetName);
        console.log(targetConstructor);
    }
}

@Logger2("GoodPerson")
class GoodPerson {
    name: string = 'BOB';

    constructor() {
        console.log("creating GoodPerson oject...");
    }
}

// decorator example 01
function WithTemplate(template: string, hookId: string) {
    return (targetConstructor: any) => {
        const hookEl = document.getElementById(hookId);
        // creating an obj of TemplateDeco using the passed constructor
        const p1 = new targetConstructor();
        if (hookEl) {
            // accessing the name property of TemplateDeco class
            hookEl.innerHTML = template + "Hello " + p1.name;
        } else {
            console.log("can't find the hookEl with the ID - " + hookId);

        }
    }
}

// using multiple decorator
// 'execution of decorator(returned fn)' from bottom to top - @WithTemplate 1st, then @Logger2
@Logger2("TemplateDeco")
@WithTemplate('<h1>withTemplate Worked!!</h1>', 'apptemp')
class TemplateDeco {
    name: string = "MAXX"
    constructor() {
        console.log("creating TemplateDeco object");

    }
}

// decorator for class property 
function PropertyLogg(target: any, propertyName: string | number): void {
    console.log("Property decorator!");
    console.log(target, propertyName);
}

// decorator for class Accessor setter/getter
function PropertyLogg_2(target: any, propertyName: string | number, descriptor: PropertyDescriptor): void {
    console.log("Accessor decorator!");
    console.log(target, propertyName, descriptor);
}

// decorator for class method
function PropertyLogg_3(target: any, propertyName: string | number, descriptor: PropertyDescriptor): void {
    console.log("Method decorator!");
    console.log(target, propertyName, descriptor);
}

// decorator for method parameter
function PropertyLogg_4(target: any, propertyName: string | Symbol, position: number): void {
    console.log("Method's parameter decorator!");
    console.log(target, propertyName, position);
}

class Product {
    @PropertyLogg
    title: string;
    private _price: number;

    @PropertyLogg_2
    set setPrice(val: number) {
        this._price = val;
    }

    get getPrice() {
        return this._price;
    }

    constructor(t: string, p: number) {
        this.title = t;
        this._price = p;
    }

    @PropertyLogg_3
    getPriceWithTax(@PropertyLogg_4 tax: number): number {
        return this._price * (tax + 1);
    }
}

// example of 'returning from method decorator'
function AutoBind(_: any, _2: string, descriptor: PropertyDescriptor) {
    const ogMethod = descriptor.value;
    const adjDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            const boundFn = ogMethod.bind(this);
            return boundFn;
        },
    }
    return adjDescriptor;
}

class printerOnClick {
    message: string = "Button is clicked!"

    @AutoBind
    showMessage() {
        console.log(this.message);

    }
}

const p = new printerOnClick();
const btn = document.querySelector('button')!;

// btn.addEventListener('click',p.showMessage);// gives undefined
// btn.addEventListener('click',p.showMessage.bind(p));// works fine
btn.addEventListener('click', p.showMessage);// using decorator, works fine

// validations with Decorator
// adding validations on title.isEmpty & price>0

interface ValidatorConfig {
    [property: string]: {
        [validatableProperty: string]: string[] // ['required','positive']
    }
}

const registeredValidators: ValidatorConfig = {};

function Required(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propName]: [...(registeredValidators[target.constructor.name]?.[propName] ?? []), 'required']
    }
}

function PositiveNumber(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propName]: [...(registeredValidators[target.constructor.name]?.[propName] ?? []), 'positive']
    }
}

function validate(obj: any) {
    const ObjectValidatorsConfig = registeredValidators[obj.constructor.name]
    if (!ObjectValidatorsConfig)
        return;
    let isValid = true;
    for (const prop in ObjectValidatorsConfig) {
        for (const validator of ObjectValidatorsConfig[prop]) {
            switch (validator) {
                case 'required':
                    isValid = isValid && !!obj[prop];
                    break;
                case 'positive':
                    isValid = isValid && obj[prop] > 0;
                    break;
            }
        }
    }
    return isValid;
}

class Course {
    @Required
    title: string;
    @PositiveNumber
    price: number;

    constructor(t: string, p: number) {
        this.title = t;
        this.price = p;
    }
}

const courseForm = document.querySelector('form')!;
courseForm.addEventListener('submit', event => {
    event.preventDefault();
    const titleEl = document.getElementById('title') as HTMLInputElement;
    const priceEl = document.getElementById('price') as HTMLInputElement;

    const createdCourse = new Course(titleEl.value, +priceEl.value);
    if (!validate(createdCourse)) {
        alert("Invalid input, please try again!");
        return
    }
    console.log(createdCourse);

})