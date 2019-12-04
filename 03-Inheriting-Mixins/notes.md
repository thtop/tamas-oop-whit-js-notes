## Inheriting and Creating Mixins

### Lesson Overview

1. Topic A: Implementing Objects, Inheritance, and Prototypes
2. Topic B: Using Class Inheritance
3. Topic C: Controlling Inheritance
4. Topic D: Implementing Multiple Inheritance
5. Topic E: Creating and Using Mixins

### Lesson Objectives

- Master prototypal inheritance
- Oberrride methods and properties
- Implement protected members
- Control object extension
- Apply multiple inheritance and mixins

- Deepen underatanding of prototypal inheritance of JavaScript
- Highlight difference form classical interference
- Cover common patterns used to implement overiding, member protection, and ectension prevention
- Descuss multiple inheritance and mixns

### Implementing Inheritance

- One of the funcamental principles in object-oriented programming
- Defined as an is-a relationship between objects
- Helps to reduce code redundancy between similar objects

### Objects and Prototypes

```js
var person = { name: "John", surname: "Sumith" };

// console.log(person.toString());
/*

Info: Start process (10:50:34 AM)
[object Object]
Info: End process (10:50:34 AM)

*/

// console.log(person.constructor.name);
/*

Info: Start process (10:51:55 AM)
Object
Info: End process (10:51:55 AM)

*/

// console.log(person instanceof Object);
/*

Info: Start process (10:52:31 AM)
true
Info: End process (10:52:32 AM)

*/
```

**prototype**

```js
var person = { name: "John", surname: "Sumith" };

person.constructor.prototype;

Object.getPrototypeOf(person);

var p = Object.getPrototypeOf(person);
p.isPrototypeOf(person); // true

person.isPrototypeOf(p); // false
```

**Creating Objecs**

- Object creation and inheritance are strictly connected
  - Ways to create objects in JavaScropt
  - 1 Literal Notation
  - 2 Constructor Function
- Creating an object without a prototype:
  `var myObject = Object.create(null);`

```js
var myObject = Object.create(null);
console.log(Object.getPrototypeOf(myObject)); // null
```

```js
var person = { name: "John", surname: "Smith" };
var myObject = Object.create(person);

console.log(myObject); // {}
```

```js
var person = { name: "", surname: "" };
var developer = Object.create(person, {
  knownLanguage: {
    writable: true,
    configurable: true,
    value: "JavaScript"
  }
});

var johnSmith = { name: "John", surname: "Smith" };
var developer = { knowLanguage: "JavaScript" };

Object.setPrototypeOf(developer, johnSmith);

console.log(developer.name); // John
```

### Prototype Chaining

```js
var person = { name: "John", surname: "Smith" };
var developer = Object.create(person, {
  knownLanguage: {
    writable: true,
    configuarable: true,
    valur: "JavaScript"
  }
});

console.log(developer.toString());

/**

Info: Start process (2:38:42 PM)
[object Object]
Info: End process (2:38:42 PM)

/
```

- An object inherits all members of its prototype and the members of the prototyp's prototype, and so on. The sequence of links between objects through the prototype relationship is called prototype chanining:

- prototype -> {} `toString()`
- prototype -> preson `-name, surname`
- protptype -> developer `knownLanguage`

### Inheritance and Constructors

- Although basic inheritance in JavaScript is a relationship between objects, we would like to manage it using object constructor:

```js
function Person(name, surname) {
  this.name = name;
  this.surname = surname;
}

function Developer(name, surname, knownLanguage) {
  Person.apply(this, arguments);
  this.knownLanguage = knownLanguage;
}

var johnSmith = new Developer("John", "Smith", "JavaScript");
console.log(johnSmith.name);
console.log(johnSmith.knownLanguage);

/*

Info: Start process (2:48:08 PM)
John
JavaScript
Info: End process (2:48:08 PM)

*/
johnSmith instanceof Developer; // true
johnSmith instanceof Person; // false
johnSmith instanceof Object; // true

Developer.prototype = Object.create(Person.prototype); // Person {}
Developer.prototype.constructor = Developer;
```

### Using Class Inheritance

- The class constructor brings a new way to define inheritance:

```js
class Person {
  constructor(name, surname) {
    this.name = name;
    this.surname = surname;
    this.getFullName = this.getFullname.bind(this);
  }

  getFullname() {
    return this.name + " " + this.surname;
  }
}

class Developer extends Person {
  constructor(name, surname, knownLanguage) {
    super(name, surname);
    this.knownLanguage = knownLanguage;
    this.getFullName = this.getFullname.bind(this);
  }

  getFullname() {
    return "Dev: " + this.name + " " + this.surname + " " + this.knownLanguage;
  }
}

var johnSmith = new Person("John", "Smith");
var marioRossi = new Developer("Mario", "Rossi", "JavaScript");

console.log(johnSmith.getFullName());
console.log(marioRossi.getFullName());

/*

Info: Start process (3:11:00 PM)
John Smith
Dev: Mario Rossi JavaScript
Info: End process (3:11:01 PM)

*/
```

### Overriding Methods

```js
function Person(name, surname) {
  this.name = name;
  this.surname = surname;
}

Person.prototype.getFullName = function() {
  return this.name + " " + this.surname;
};

function Developer(name, surname, knownLanguage) {
  Person.apply(this, arguments);
  this.knownLanguage = knownLanguage;
}

Developer.prototype = Object.create(Person.prototype);
Developer.prototype.constructor = Developer;

Developer.prototype.getFullName = function() {
  return "Dev " + Person.prototype.getFullName.call(this);
};

var johnSmith = new Person("John", "Smith");
var marioRossi = new Developer("Mario", "Rossi", "JavaScript");

console.log(johnSmith.getFullName());
console.log(marioRossi.getFullName());

/*

Info: Start process (3:05:52 PM)
John Smith
Dev Mario Rossi
Info: End process (3:05:52 PM)

*/
```

**ECMAScript 2015**

- ECMAScript 2015 syntax allows you to simplify the way you can override a method:

```js
class Person {
  constructor(name, surname) {
    this.name = name;
    this.surname = surname;
    this.getFullName = this.getFullname.bind(this);
  }

  getFullname() {
    return this.name + " " + this.surname;
  }
}

class Developer extends Person {
  constructor(name, surname, knownLanguage) {
    super(name, surname);
    this.knownLanguage = knownLanguage;
    this.getFullName = this.getFullname.bind(this);
  }

  getFullname() {
    return "Dev: " + this.name + " " + this.surname + " " + this.knownLanguage;
  }
}

var johnSmith = new Person("John", "Smith");
var marioRossi = new Developer("Mario", "Rossi", "JavaScript");

console.log(johnSmith.getFullName());
console.log(marioRossi.getFullName());

/*

Info: Start process (3:11:00 PM)
John Smith
Dev: Mario Rossi JavaScript
Info: End process (3:11:01 PM)

*/
```

### Overriding Properties

- Every time we define a constructor that inherits from some other constructor, we are overriding the parent's properites.

```js
function Developer(name, surname, knownLanguage) {
  Person.apply(this, arguments);
  this.knownLanguage = knownLanguage;
}

Developer.prototype = new Person();
Developer.prototype.constructor = Developer;
```

- There are situations where a property needs to be redefined for a derived constructor:

```js
function Person(name, surname) {
  this.name = name;
  this.surname = surname;
}

function Developer(name, surname, knownLanguage) {
  Person.apply(this, arguments);
  this.knownLanguage = knownLanguage;
}

Object.defineProperty(Person.prototype, "fullName", {
  get: function() {
    return this.name + " " + this.surname;
  }
});

Object.defineProperty(Developer.prototype, "fullName", {
  get: function() {
    return "Dev " + this.name + " " + this.surname;
  }
});

var johnSmith = new Person("John", "Smith");
var marioRossi = new Developer("Mario", "Rossi", "JavaScript");

console.log(johnSmith.fullName);
console.log(marioRossi.fullName);

/*

Info: Start process (3:31:37 PM)
John Smith
Dev Mario Rossi
Info: End process (3:31:37 PM)

*/
```

### Protected Members

- A protected member is a private member only visible to derived objects:

```js
var Person = (function() {
  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function PersonConstructor(name, surname) {
    this.name = capitalize(name);
    this.surname = capitalize(surname);
  }

  return PersonConstructor;
})();

// var p = new Person("john", "smith");
// console.log(p.name); // John
```

```js
var Person = (function() {
  var protectedMembers;

  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function PersonConstructor(name, surname, protected) {
    protectedMembers = protected || {};

    protectedMembers.capitalize = capitalize;

    this.name = capitalize(name);
    this.surname = capitalize(surname);
  }

  return PersonConstructor;
})();

function Developer(name, surname, knownLaguage) {
  var parentProtected = {};

  Person.call(this, name, surname, parentProtected);

  this.knownLanguage = parentProtected.capitalize(knownLaguage);
}

var d = new Developer("Mario", "rossi", "javaScript");
console.log(d.surname); // Rossi
```

```js
var person = { name: "John", surname: "Smith" };

Object.preventExtensions(person);

person.age = 32;

console.log(person.age); // result: underfined

if (Object.isExtensible(person)) {
  person.age = 32;
}

console.log(person); // { name: 'John', surname: 'Smith' }
```

```js
function Person(name, surname) {
  this.name = name;
  this.surname = surname;

  Object.preventExtensions(this);
}

function Developer(name, surname, knownLanguage) {
  Person.apply(this, arguments);
  this.knownLanguage = knownLanguage;
}

var dev = new Developer("Mario", "Rossi", "JavaScript");

console.log(dev.knownLanguage); // undefined
```

**Object.seal**

```js
function Person(name, surname) {
  this.name = name;
  this.surname = surname;

  Object.seal(this);
}

var person = new Person("John", "Smith");

delete person.name;

console.log(person);
// Person { name: 'John', surname: 'Smith' }

if (!Object.isSealed(person)) {
  delete person.name;
}
```

```js
function Person(name, age) {
  this.name = name;
  this.age = age;
}
var person = new Person("John", 28);

Object.freeze(person);

person.name = "Mario";

person.age = 32;

delete person.name;

console.log(person);

/*

Info: Start process (4:14:05 PM)
Person { name: 'John', age: 28 }
Info: End process (4:14:06 PM)

*/

if (!Object.isFrozen(person)) {
  person.name = "Mario";
}
```

### Implementing Multiple Inhertitance

```js
function Person(name, surname) {
  this.name = name;
  this.surname = surname;
}

function Developer(name, surname, knownLanguage) {
  Person.apply(this, arguments);
  this.knownLanguage = knownLanguage;
}

function Student(name, surname, subjectOfStudy) {
  Person.apply(this, arguments);
  this.subjectOfStudy = subjectOfStudy;
}

function DevStudent(name, surname, knownLanguage, subjectOfStudy) {
  Developer.call(this, name, surname, knownLanguage);
  Student.call(this, name, surname, subjectOfStudy);
}

var johnSmith = new DevStudent("John", "Smith", "C#", "JavaScript");

console.log(johnSmith.knownLanguage); //result: C#
console.log(johnSmith.subjectOfStudy); //result: JavaScript
```

### Creating and Using Mixins

```js
// class Person {
//   constructor(name, surname) {
//     this.name = name;
//     this.surname = suranem;
//   }
// }

function Person(name, surname) {
  this.name = name;
  this.surname = surname;
}

var myMixin = {
  getFullName: function() {
    return this.name + " " + this.surname;
  }
};

function augment(destination, source) {
  for (var methodName in source) {
    if (source.hasOwnProperty(methodName)) {
      destination[methodName] = source[methodName];
    }
  }
  return destination;
}

augment(Person.prototype, myMixin);

var johnSmith = new Person("John", "Smith");

console.log(johnSmith.getFullName()); //result: "John Smith"
```

### Lesson Summary

- Inheritance mechanism of JavaScript based on prototypes
- Objects can be linked each other through their prototypes to create a chain
- The creation of an inheritance relationship between constructor functions and classes
- Different ways to control inheritance
- Implementation if multiple inheritance
- Use of the mixin pattern with constructor function and classes

### Quiz 3: Test your knowledge
