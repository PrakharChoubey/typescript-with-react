"use strict";
// Best example of decorator is @Component in angular
// look like this : - 
// @Component({
//   selector: 'app-component-overview',
//   templateUrl: './component-overview.component.html',
//   styleUrls: ['./component-overview.component.css']
// })
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
// decorator's names starts with capital letter
// decorators are called, when class gets defined
function Logger(target) {
    console.log("Logging......");
    console.log(target);
    console.log("Logging Ends Here......");
}
let Person2 = class Person2 {
    constructor() {
        this.name = 'MAX';
        console.log("creating Person oject...");
    }
};
Person2 = __decorate([
    Logger
], Person2);
const pers = new Person2();
console.log(pers);
// working with decorators Factories
function Logger2(targetName) {
    return (targetConstructor) => {
        console.log("Logging--" + targetName);
        console.log(targetConstructor);
    };
}
let GoodPerson = class GoodPerson {
    constructor() {
        this.name = 'BOB';
        console.log("creating GoodPerson oject...");
    }
};
GoodPerson = __decorate([
    Logger2("GoodPerson")
], GoodPerson);
// decorator example 01
function WithTemplate(template, hookId) {
    return (targetConstructor) => {
        const hookEl = document.getElementById(hookId);
        // creating an obj of TemplateDeco using the passed constructor
        const p1 = new targetConstructor();
        if (hookEl) {
            // accessing the name property of TemplateDeco class
            hookEl.innerHTML = template + "Hello " + p1.name;
        }
        else {
            console.log("can't find the hookEl with the ID - " + hookId);
        }
    };
}
// using multiple decorator
// 'execution of decorator(returned fn)' from bottom to top - @WithTemplate 1st, then @Logger2
let TemplateDeco = class TemplateDeco {
    constructor() {
        this.name = "MAXX";
        console.log("creating TemplateDeco object");
    }
};
TemplateDeco = __decorate([
    Logger2("TemplateDeco"),
    WithTemplate('<h1>withTemplate Worked!!</h1>', 'apptemp')
], TemplateDeco);
// decorator for class property 
function PropertyLogg(target, propertyName) {
    console.log("Property decorator!");
    console.log(target, propertyName);
}
// decorator for class Accessor setter/getter
function PropertyLogg_2(target, propertyName, descriptor) {
    console.log("Accessor decorator!");
    console.log(target, propertyName, descriptor);
}
// decorator for class method
function PropertyLogg_3(target, propertyName, descriptor) {
    console.log("Method decorator!");
    console.log(target, propertyName, descriptor);
}
// decorator for method parameter
function PropertyLogg_4(target, propertyName, position) {
    console.log("Method's parameter decorator!");
    console.log(target, propertyName, position);
}
class Product {
    set setPrice(val) {
        this._price = val;
    }
    get getPrice() {
        return this._price;
    }
    constructor(t, p) {
        this.title = t;
        this._price = p;
    }
    getPriceWithTax(tax) {
        return this._price * (tax + 1);
    }
}
__decorate([
    PropertyLogg
], Product.prototype, "title", void 0);
__decorate([
    PropertyLogg_2
], Product.prototype, "setPrice", null);
__decorate([
    PropertyLogg_3,
    __param(0, PropertyLogg_4)
], Product.prototype, "getPriceWithTax", null);
// example of 'returning from method decorator'
function AutoBind(_, _2, descriptor) {
    const ogMethod = descriptor.value;
    const adjDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            const boundFn = ogMethod.bind(this);
            return boundFn;
        },
    };
    return adjDescriptor;
}
class printerOnClick {
    constructor() {
        this.message = "Button is clicked!";
    }
    showMessage() {
        console.log(this.message);
    }
}
__decorate([
    AutoBind
], printerOnClick.prototype, "showMessage", null);
const p = new printerOnClick();
const btn = document.querySelector('button');
// btn.addEventListener('click',p.showMessage);// gives undefined
// btn.addEventListener('click',p.showMessage.bind(p));// works fine
btn.addEventListener('click', p.showMessage); // using decorator, works fine
const registeredValidators = {};
function Required(target, propName) {
    var _a, _b;
    registeredValidators[target.constructor.name] = Object.assign(Object.assign({}, registeredValidators[target.constructor.name]), { [propName]: [...((_b = (_a = registeredValidators[target.constructor.name]) === null || _a === void 0 ? void 0 : _a[propName]) !== null && _b !== void 0 ? _b : []), 'required'] });
}
function PositiveNumber(target, propName) {
    var _a, _b;
    registeredValidators[target.constructor.name] = Object.assign(Object.assign({}, registeredValidators[target.constructor.name]), { [propName]: [...((_b = (_a = registeredValidators[target.constructor.name]) === null || _a === void 0 ? void 0 : _a[propName]) !== null && _b !== void 0 ? _b : []), 'positive'] });
}
function validate(obj) {
    const ObjectValidatorsConfig = registeredValidators[obj.constructor.name];
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
    constructor(t, p) {
        this.title = t;
        this.price = p;
    }
}
__decorate([
    Required
], Course.prototype, "title", void 0);
__decorate([
    PositiveNumber
], Course.prototype, "price", void 0);
const courseForm = document.querySelector('form');
courseForm.addEventListener('submit', event => {
    event.preventDefault();
    const titleEl = document.getElementById('title');
    const priceEl = document.getElementById('price');
    const createdCourse = new Course(titleEl.value, +priceEl.value);
    if (!validate(createdCourse)) {
        alert("Invalid input, please try again!");
        return;
    }
    console.log(createdCourse);
});
//# sourceMappingURL=decorator.js.map