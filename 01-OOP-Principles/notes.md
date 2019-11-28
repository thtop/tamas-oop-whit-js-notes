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

* The simplest way to create an object in JavaScript is using the literal representation:

```js
var emptyObject = {};
var person = { name: "John", surname: "Smith" };
person.greet = function() {
  return "Hello there!";
};
```

## Properties

```js
var person = {
  name: "John",
  surname: "Smith",
  address: {
    street: "13 Duncannon Street",
    city: "London",
    country: "United Kingdom"
  }
};
```

```js
var person = {
  name: "John",
  "middle-name": "Ian",
  surname: "Smith",
  address: {
    street: "13 Duncannon Street",
    city: "London",
    country: "United Kingdom"
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

Object.defineProperty(obj, "attrib", {
  value: 42,
  writable: true,
  configurable: false // attrib connot be deleted
});

delete obj.attrib; // won't work

console.log(obj);
```

```js
var obj = {};

Object.defineProperty(obj, "attrib", {
  value: 42,
  writable: true,
  configurable: true // attrib can be deleted
});

delete obj.attrib; // will now work

console.log(obj);
```

### Method

```js
var person = {
  name: "John",
  surname: "Smith",
  "middle-name": "Ian",
  address: {
    street: "13 Duncannon Street",
    city: "London",
    country: "United Kingdom"
  }
};

function showFullName() {
  return "John Smith";
}

person.fullName = showFullName;

console.log(person);
```

```js
var person = {
  name: "John",
  surname: "Smith",
  "middle-name": "Ian",
  address: {
    street: "13 Duncannon Street",
    city: "London",
    country: "United Kingdom"
  },
  fullName: function() {
    return this.name + " " + this.surname;
  }
};

console.log(person);
```

### Defining Object Constructors

- Creating multiple objects of the same type using object literals is not the best approach:
- **Part 1**

```js
var johnSmith = {
  name: "John",
  surname: "Smith",
  addredd: {
    street: "13 Ducannon street",
    city: "London",
    country: "United Kingdom"
  },
  displayFullName: function() {
    return this.name + " " + this.surname;
  }
};
```

- **Part 2**

```js
var marioRossi = {
  name: "Maario",
  surname: "Rossi",
  address: {
    street: "Piazza Colonna 370",
    city: "Roma",
    country: "Italy"
  },
  displayFullName: function() {
    return this.name + " " + this.surname;
  }
};
```

### Constructors

```js
/*

function Person() {
  this.name = '',
  this.surname = '',
  this.address = '',
  this.email = '',
  this.displayFullName = function() {
    return this.name + ' ' + this.surname;
  }
}

*/

var johnSmith = new Person();
johnSmith.name = "John";
johnSmith.surname = "Smith";

var marioRossi = new Person();
marioRossi.name = "Mario";
marioRossi.surname = "Rossi";
```

```js
/*

function Person(name, surname) {
  this.name = name,
  this.surname = surname,
  this.address = '',
  this.email = '',
  this.displayFullName = function() {
    return this.name + ' ' + this.surname;
  }
}

*/

var johnSmith = new Person("John", "Smith");

var marioRossi = new Person("Mario", "Rossi");
```

### The Strict Model

- Value of the object represented by the `this` keyword is undefined during the executin of the function.
- Runtime error is generated while trying to access the property of an object that does not exist.
- This approach is not sufficient when the constructor is defined inside a namespace.

```js
var mankind = {
  //...
  Person: function(name, surname) {
    "use strict";
    this.name = name;
    this.surname = surname;
    // ...
  }
};

var johnSmith = mankind.Person("John", "Smith");
```

```js
"use strict";
function test() {
  a = 1;
}
```

- Buil-in Object constructor

```js
var person = new Object();
person.name = "John";
person.surname = "Smith";
```

```js
var number = new Object(12);
var string = new Object("test");
var antoherNumber = new Object(3 * 2);
var person = new Object({ name: "John", surname: "Smith" });
```

### Using Object Prototypes

- How do you change the structure of all objects created using a constructor? It is by using prototypes:

```js
function Person(name, surname) {
  this.name = name;
  this.surname = surname;
}

var johnSmith = new Person("John", "Smith");
var marioRossi = new Person("Mario", "Rossi");

Person.prototype.greets = function() {
  console.log("Hello " + this.name + " " + this.surname + "!");
};

johnSmith.greets(); // Hello John Smith!;
marioRossi.greets(); // Hello Mario Rossi!
```

### Creating an Object Using a Constructor

- Its prototypes object is the prototype of the constructor
- On trying to access a property or method of an object, JavaScript looks for it among the properties and methods of its prototype.
- If you try to access the `greets()` method of the `marioRossi` object, JavaScript does not find it among its methods
- The prototype of an object can in turn have another prototype

### Object Prototypes

- Make a padding method available to all strings:

**Code 1:**

```js
String.prototype.padLeft = function(width, char) {
  var result = this;
  char = char || "";

  if (this.length < width) {
    result = new Array(width - this.length + 1).join(char) + this;
  }
  return result;
};

console.log("abc".padLeft(10, "x")); // xxxxxxxabc
```

**Code 2:**

```js
console.log("abc".padLeft(10, "x"));
```

### Using Classes

- The JavaScript class construct provides a much simpler and clearer syntax for managing constructors, prototypes, and inheritance.
- The new class creates order among the different types of object creation and aims to apply the best practices in prototype management.

```js
class Person {
  constructor(name, surname) {
    this.name = name;
    this.surname = surname;
  }
}

var johnSmith = new Person("John", "Smith");
```

```js
var Person = class {
  constructor(name, surname) {
    this.name = name;
    this.surname = surname;
  }
};

var johnSmith = new Person("John", "Smith");
```

```js
var Person = class {
  constructor(name, surname) {
    this.name = name;
    this.surname = surname;
  }

  displayFullName() {
    return this.name + " " + this.surname;
  }
};

var johnSmith = new Person("John", "Smith");
johnSmith.displayFullName();
```

### Beginning with Object-Oriented JavaScript

- **Requirement 1:** The capablity to model a problem through objects and relationships among objects
  - **Association**: Object's capablility to refer another independent object(indent)
  - **Agregation**: Object's calpabliti to embed one or more independent objects
  - **Composition**: Object's capbility to embed one or more dependent objects
- **Requirement 2:** The support of a few principles that grant modularity and code reuse

  - **Encapsulation**: Capability to concentrate into a single entity data and code that manipulates it, hiding its interal details
  - **Inheritance**: Mechanism by which an object acquires some or all features from one or more other objects
  - **Polymorphism**: This is the capabltity to process objects differenrly base on their data type or structure

  > Classes are not a real requirement, but they are sometimes a convenient way to abstract sets of objects with common prpperties. So, a language can be Object-Oriented if it supports objects event without classes, as in JavaScript.

### Is JavaScript Object-Oriented?

- Many developers do not consider JavaScript a true Object-Oriented language.
- JavaScript lacks the concept of class and it does not enforce compliance with OOP principles.
- Classes are sometimes a convenient way to abstract sets of objects with common preperties.
- A language can be Object-Oriented if it supports objects even without classes, as in JavaScript.
- You can choose to either use constructs that allows them to create Object-Orientd code or not.
