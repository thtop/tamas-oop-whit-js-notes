## Working with Encapsulation and Information Hiding

### Lesson Overview

1. Topic A: Setting up Strategies for Encapsulation and Information Hiding
2. Topic B: Using the Meta-Closure Approach
3. Topic C: Using Property Descriptors
4. Topic D: Implementing Information Hiding in ES6 Classes

### Lesson Objectives

- Define public and private properties
- Take advantage of scope and closure
- Apply techniques to protect private members
- Use getters, setters, and property descriptors
- Master property definition in ES6 classes

### Encapsulation and Information Hiding

- The **information hiding** principle enforces the design of objects that have at least two parts:
  - Public
  - Private
- **Encapsulation** hides the internal details regrding how the object mainpulates its data
- Hiding interal details has at least two great benefits
  - Provides a simple way to use an object
  - Decouples the internal implementation from the use of the object

### Convetion-Based Approach

- Adopt convention-based naming for internal members of an object.
- For example, internal members can have a name starting with a prefix, such as the underscore `_` character:

```js
function TheatreSeats() {
  this._seats = [];
}

TheatreSeats.prototyes.placePerson = function(person) {
  this._seats.push(person);
};

var theatreSeats = new TheatreSeats();

theatreSeats.placePerson({ name: "John", surname: "Smith" });
```

### Privacy Levels Using Closure

- Instead of using properties for internal members, declare variables inside the constructor:

```js
function TheatreSeats() {
  var seats = [];

  this.placePerson = function(person) {
    seats.push(person);
  };
}
```

How to implement?

```js
var greeting = "Good morning";

function greets(person) {
  var fullName = person.name + " " + person.surname;

  function displayGreeting() {
    console.log(greeting + " " + fullName);
  }
  displayGreeting();
}

greets({ name: "John", surname: "Smith" });

/*

Info: Start process (3:53:25 AM)
Good morning John Smith
Info: End process (3:53:25 AM)

*/
```

### Privacy Levels

- The new definition of the `TheatreSeats()` constructor is slightly different from the original one
- In order to use the constructor's closure to hide the internal details, you need to implement a method inside the constructor itself

> Classification of an object's members in order to determine how to implement the information hiding principle:

1. Members that cannot be publicly accessed (**private members**)
2. Members that do not use private members and that can be publicly accessed (**public members**)
3. Members that use private members and that can be publicly accessed (**privileged members**)

**Private Member**

- A private member must be implementd as:
  - A local variable
  - Function of the constructor

**Public Member**

- A public member must be inplemented as:
  - A member of the this keyword
  - A member of the constructor's prototype

**Privileged Mamber**

- A privlieged member must be implementd as:
  - A member of the this keyword inside the constructor

```js
// Person class has been declared in the previous code
function TheatreSeats() {
  var seats = [];
  this.placePerson = function(person) {
    seats.push(person);
  };
  this.countOccupiedSeats = function() {
    return seats.length;
  };
  this.maxSize = 10;
}

TheatreSeats.prototype.isSoldOut = function() {
  return this.countOccupiedSeats() >= this.maxSize;
};

TheatreSeats.prototype.countFreeSeats = function() {
  return this.maxSize - this.countOccupiedSeats();
};
```

### Benefits and Drawbacks

- +
  - It use clousre to define the three levels of privacy, which is much more effective
  - It grants private data protection
- -
  - It exposes just what the developer needs to access to use the object
  - It suffers from some flaws

### Using the Meta-Closure Approach

### Managing Isolated Private Members

### A Defintive Solution with WeakMap

### Using Property Descriptors Part -1

### Using Property Descriptors Part -2

### Implementing Information Hiding in ES6 Classes

### Leasson Summary

### Quiz 2: Test your knowledge
