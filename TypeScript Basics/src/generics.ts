const arrNames: Array<string | number> = []; // same as using string[]

const promiseEx: Promise<number> = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(200);
    }, 2000);
})

// promiseEx.then(data=>data.split(''))

// creating a generic function
// function merge<T, U>(objA: T, objB: U) {
//     return Object.assign(objA, objB);
// }
// const merged = merge({ name: "max", age: 23 }, { hobbies: ["painting"] });

// to fix above issue :-----

// generic functions with constraints - T & U HAVE to be objects
function merge22<T extends object, U extends object>(objA: T, objB: U) {
    return Object.assign(objA, objB);
}

// const merged22 = merge22({ name: "max", age: 23 }, 20);
