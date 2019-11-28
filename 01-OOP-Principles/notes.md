## Diving into Objects and OOP Principles

### Course Overview
- By Tamas Piros
- Basic Concepts
  - OOP principles
  - Encapsulation
  - Inheriting
  - Creating Mixins
- Advanced Object Creation
  - Defining Contracts
  - Using Duck Typing
  - Working with Data
- Application Architecture
  - Asynchronous Programming
  - Promises
  - Organizing Code

1. Diving into Objects and OOP Principles
2. Working with Encapsulation and Information Hiding
3. Inheriting and Creating Mixins
4. Defining Contracts with Duck Typing
5. Advanced Object Creation
6. Working wigh Data
7. Asynchronous Programming and Promises
8. Organizing Code

### Lesson Overview
- Topic A: Creating and Managing Object Literals
- Topic B: Defining Object Constructors
- Topic C: Using Object Prototypes
- Topic D: Using Classes
- Topic E: Beginning with Object-Oriented JavaScript
- Topic F: Checking Abstraction and Modeling Support
- Topic G: Analying OOP Priciples Support in JavaScript

### Lesson Objecttives
- Create and manage object literals
- Define object constructors and use prototypes
- Use the new ECMAScript 2015 class construct and understand its relation to objects, constructors, and prototypes
- Understand the principles of the OOP paradigm
- Implement the encapsulation principle in JavaScript
- Implement the inheritance principle in JavaScript
- Check support of the polymorphism principle

### Introduction
- Everything in JavaScript is an object - from arrays to functions, from regular expression to dates
- Non-primitive data type is an object
- Primitive data types such as numbers or strings have object wrappers (accessible via objects)
- Objects are vital in JavaScript, and you need to learn the use of objects, in order to create better applications
- One way, to better use objects, is applying the Object-Oriented Programming (OOP) paradigm

### Creating and Managing Object Literals

- An object is used to represent a specific entity, through an aggregation of data and functionalities
- The data is called properties and represented by pairs of names and values
- The functionalities are usually called methods and are represented by functions


- The simplest way to create an object in JavaScript is using the literal representation: 
```js
var emptyObject = {};
var person = { name: 'John', surname: 'Smith'};
person.greet = function() {
  return 'Hello there!';
}
```

## Properties

```js
var person = {
  name: 'John',
  surname: 'Smith',
  address: {
    street: '13 Duncannon Street',
    city: 'London',
    country: 'United Kingdom'
  }
};
```

```js
var person = {
  name: 'John',
  "middle-name": 'Ian',
  surname: 'Smith',
  address: {
    street: '13 Duncannon Street',
    city: 'London',
    country: 'United Kingdom'
  }
};

var name = person.name;
var middleName = person["middle-name"];
var city = person.address.city;

person.age = 22;

console.log(person);
```

```js
var obj = {};

Object.defineProperty(obj, 'attrib', {
  value: 42,
  writable: true,
  configurable: false // attrib connot be deleted
})

delete obj.attrib; // won't work

console.log(obj);
```

```js
var obj = {};

Object.defineProperty(obj, 'attrib', {
  value: 42,
  writable: true,
  configurable: true // attrib can be deleted
})

delete obj.attrib; // will now work

console.log(obj);
```

### Method

```js
var person = {
  name: 'John',
  surname: 'Smith',
  "middle-name": 'Ian',
  address: {
    street: '13 Duncannon Street',
    city: 'London',
    country: 'United Kingdom'
  }
};

function showFullName() {
  return 'John Smith';
}

person.fullName = showFullName;

console.log(person)
```


```js
var person = {
  name: 'John',
  surname: 'Smith',
  "middle-name": 'Ian',
  address: {
    street: '13 Duncannon Street',
    city: 'London',
    country: 'United Kingdom'
  },
  fullName: function() {
  return this.name + ' ' + this.surname;
 }
};

console.log(person);

```