/**
 * Base info abouth the subject:
 *  - https://addyosmani.com/resources/essentialjsdesignpatterns/book/#constructorpatternjavascript
 * Difference between Constructor pattern and Prototype pettern:
 *  - https://stackoverflow.com/questions/35057827/difference-between-constructor-pattern-and-prototype-pattern
 */

// Each of the following options will create a new empty object:
var newObject = {}; // Object literal notation
// or
// var newObject = Object.create(Object.prototype); // with null as a parameter will create an object without prototype
// or 
// var newObject = new Object(); // Object literal notation is more preferable


// Ways to add new key:value pairs

// ECMAScript 3 compatible approaches

// 1. Dot syntax

// Set properties
newObject.someKey = 'Hello World';

// Get properties
var value1 = newObject.someKey;


// 2. Square brackets syntax

// Set properties
newObject['someKey'] = 'Hello World'; // for that case Dot notation is more preferable

// Get properties
var value2 = newObject['someKey']; // it's a good option to use square brackets for the modern dynamic keys or for the keys with hyphens


// ECMAScript 5 only compatible approaches
// For more information see: http://kangax.github.com/es5-compat-table/

// 3. Object.defineProperty

// Set properties
Object.defineProperty(newObject, 'someKey', {
    value: "for more control of the property's behavior",
    writable: true,
    enumerable: true,
    configurable: true
});

// If the above feels a little difficult to read, a short-hand could
// be written as follows:

var defineProp = function(obj, key, value) {
    var config = {
        value: value, // at least in the ES6 version you can use short-hand notation for the variable names equal to object's field names
        writable: true,
        enumerable: true,
        configurable: true
    };

    Object.defineProperty(obj, key, config);
};

// To use, we then create a new empty "person" object
var person = Object.create(Object.prototype);

// Populate the object with properties
defineProp(person, 'car', 'Delorean');
defineProp(person, 'dateOfBirth', '1981');
defineProp(person, 'hasBeard', false);

console.log(person);
// Outputs: Object { car: 'Delorean', dateOfBirth: '1981', hasBeard: false }

// 4. Object.defineProperties

// Set properties
Object.defineProperties(newObject, {
    'someKey': {
        value: 'Hello World',
        writable: true
    },
    'anotherKey': {
        value: 'Foo bar',
        writable: false
    }
});

// Getting properties for 3. and 4. can be done using any of the
// options in 1. and 2.

// Usage:

// Create a race car driver that inherits from the person object
var driver = Object.create(person);

// Set some properties for the driver
defineProp(driver, 'topSpeed', '100mph');

// Get an inherited property (1981)
console.log(driver.dateOfBirth);

// Get the property we set (100mph)
console.log(driver.topSpeed);


// Basic constructors

function Car(model, year, miles) {
    this.model = model;
    this.year = year;
    this.miles = miles;

    // In this case method will be redifined for each new instance of the function
    // This variant isn't really optimal
    // this.toString = function() {
    //     return this.model + ' has done ' + this.miles + ' miles';
    // };
}

// In this case method will be shared among all the instances
// wihtout redefining
Car.prototype.toString = function() {
    return this.model + ' has done ' + this.miles + ' miles';
};

// Usage:

// We can create new instances of the car
var civic = new Car('Honda Civic', 2009, 20000);
var mondeo = new Car('Ford Mondeo', 2010, 5000);

// and then open our browser console to view the
// output of the toString() method being called on
// these objects
console.log(civic.toString());
console.log(mondeo.toString());

// In ES6 we have classes and EXTENDS which give us an opportunity
// to create new objects and implement inheritance easier