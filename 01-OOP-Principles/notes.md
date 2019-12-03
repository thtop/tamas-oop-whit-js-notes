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

### Title Map

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

### Lesson Objectives

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

- Object: person
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

- Add properties `-`
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

/*

Info: Start process (3:42:21 PM)
{
  name: 'John',
  'middle-name': 'Ian',
  surname: 'Smith',
  address: {
    street: '13 Duncannon Street',
    city: 'London',
    country: 'United Kingdom'
  },
  age: 22
}
Info: End process (3:42:21 PM)

*/
```

- Object.defineProperty (1)

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

- Object.defineProperty (2)

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

- function assiged method
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

/*

Info: Start process (3:44:25 PM)
{
  name: 'John',
  surname: 'Smith',
  'middle-name': 'Ian',
  address: {
    street: '13 Duncannon Street',
    city: 'London',
    country: 'United Kingdom'
  },
  fullName: [Function: showFullName]
}
Info: End process (3:44:25 PM)

*/
```

- Method in object
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

/*

Info: Start process (3:45:25 PM)
{
  name: 'John',
  surname: 'Smith',
  'middle-name': 'Ian',
  address: {
    street: '13 Duncannon Street',
    city: 'London',
    country: 'United Kingdom'
  },
  fullName: [Function: fullName]
}
Info: End process (3:45:25 PM)


*/
```

--- 

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

- Constructor with parameters
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

- Value of the object represented by the `this` keyword is undefined during the execution of the function.
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

---

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

---

### Using Classes

- The JavaScript class construct provides a much simpler and clearer syntax for managing constructors, prototypes, and inheritance.
- The new class creates order among the different types of object creation and aims to apply the best practices in prototype management.

- class

```js
class Person {
  constructor(name, surname) {
    this.name = name;
    this.surname = surname;
  }
}

var johnSmith = new Person("John", "Smith");
```

- class assign to valiable
- 
```js
var Person = class {
  constructor(name, surname) {
    this.name = name;
    this.surname = surname;
  }
};

var johnSmith = new Person("John", "Smith");
```

- class and method

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

---

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

---

### Checking Abstraction and Modeling Support

- You try to model real-world entities and processes and represent them in your software
- You need a model because it is a simplification of reality and helps you to reason about a relationship among entiries
- This simplification feature is usually known as abstraction
- Abstraction is the capability to define which properties and actions have to be represented by means of bojects in a program in order to solve a specific problem
- You can decide that to solve a specific problem you can represent a person just as an object
- Modeling reality also involves defining relationships between objects, such as association, aggregation, and composition

### Associaltion

- Association is a relationship between two or more objects where each object is independent of the others:

```js
function Person(name, surname) {
  this.name = name;
  this.surname = surname;
  this.parent = null;
}

var johnSmith = new Person("John", "Smith");
var fredsmith = new Person("Fred", "Smith");

fredsmith.parent = johnSmith; // Association

console.log(fredsmith);

/*

Info: Start process (4:29:47 PM)
[Function: Person]
Person {
  name: 'Fred',
  surname: 'Smith',
  parent: Person { name: 'John', surname: 'Smith', parent: null }
}
Info: End process (4:29:47 PM)

*/


```

### Aggregation

- Aggregation is a special form of association relationship where an object has a more important role than the others:

```js
function Person(name, surname) {
  this.name = name;
  this.surname = surname;
  this.parent = null;
}

var company = {
  name: "ACME Inc.",
  employees: []
};

var johnSmith = new Person("John", "Smith");
var marioRossi = new Person("Mario", "Rossi");

company.employees.push(johnSmith);
company.employees.push(marioRossi);

console.log(company);

/*

Info: Start process (4:34:16 PM)
{
  name: 'ACME Inc.',
  employees: [
    Person { name: 'John', surname: 'Smith', parent: null },
    Person { name: 'Mario', surname: 'Rossi', parent: null }
  ]
}
Info: End process (4:34:16 PM)

*/
```


### Composition

- Composition is a strong type of aggregation, where each component object has no independent life without its owner, the aggreate:

```js
var person = {
  name: "John",
  surname: "Smith",
  address: {
    street: "123 Duncannon Street",
    city: "Londo",
    country: "United Kingdom"
  }
};


```

---

### Analiyzing OOP Principle Support in JavaScript

1. Encapsulation
2. Inheritance
3. Polymorphism

**Encapulation**

- The encapsulation principle allows an object to expose just what is needed to use it, hiding the complexity if its implementation:

**Code 1**
```js
var company = {
  name: "",
  employees: [],
  sortEmployeesByName: function() { }
};
```

**Code 2**

```js
function Company(name) {
  var employees = [];

  this.name = name;

  this.getEmployees = function() {
    return employees;
  };

  this.addEmployees = function() {
    employees.push(employee);
  };

  this.sortEmployeesByName = function() {
    // ...
  };
}

var company = new Company("ACME Inc.");

```

**Information Hiding**

- It is a kind of data protection
- It deals with the accessibility to an object's members, in particular to properties
- It allows different access levels to the members of an object


**Inheritance**

- Inheritance enables new objects to acqire the properties of existing objects:
- Abstraction
  - Person 
  - Name
  - Surname
- Programmer
  - Name
  - Surname
  - KnownLanguage

```js

function Person(name, surname) {
  this.name = name;
  this.surname = surname;
}

function Programmer(knownLanguage) {
  this.knownLanguage = knownLanguage;
}

Programmer.prototype = new Person();

var programmer = new Programmer("JavaScript");

```


**Polymorphism**

- Polymorphism is the ability to handle multiple data types uniformly.
- The most common ways to support polymorphism with a programming language include the following:
- Methods that take parameters with different data types (overloading)
- Methods of generic types, not known in advance (parametric polymorphism)
- Expressions whose type can be represented by a classes and classes derived from it (subtype polymorphism or inclusion polymorphism)


**C#**
```c#

public int Sum(int x, int y) {
  return Sum(x, y, 0);
}

public int Sum(int x, int y, int z) {
  return x + y + z;
}

```

**ES5**

```js
function Sum(x, y, z) {
  x = x ? x : 0;
  y = y ? y : 0;
  z = z ? z : 0;
  return x + y + z;
}
```

**ES2015**

```js
function Sum(x = 0, y = 0, z = 0) {
  return x + y + z
}
```

### JavaScript OOP versus Classical OOP

| JavaScript OOP                                                                           | Classical OOP                                                |
| ---------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| The dynamic nature of the language allows you to change an object's structure at runtime | It is not possble to change an object's structure at runtime |
| No classes                                                                               | classes                                                      |
| Prototypal inheritance is an operation on objects                                        | Classical inheritance is an operation on classes             |

### Summary

- We explored two approaches to creating objects
- We introcuced the new class construct
- We explored the basic principles of the OOP paradigm
- We saw how JavaScript supports all features that allow us to define it as a true OOP language
- We compared classical OOP with prototypal OOP

### Quiz 1: Test your knowledge

1. What are the restrictions for JavaScript variable name?
- JavaScript variables can contain letters, digits, underscores (_), and dollar symbols ($)

2. What OOP is and how you can ascertain if a programming language is OOP or not?
- The OOP paradigm is not based on a formal standard specification.


3. Which of the following are correct names for an object property?
- name_surname

4. What is a correct way to define a method on an object?

```js
var person = {}
person.greet = function() {
  return 'Hello';
}

var person = {
  greet: function() {
    return 'Hello';
  }
};
```

5. What is an object constructor?
- A function that defines the structure of an object

6. Which of the following sentences are true?
- These assignments are equivalent: `var x = new Object()` and `var x = {}`

7. Which of the following sentences is not true?
- Polymorphism is the ability to define an object in many ways
