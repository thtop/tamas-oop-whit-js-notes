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

- **Immediately Invoked Function Expression**
- An Immerdiately Invoked Function Expression (IIFF) is a JavaScript expression involving an anonymous function definition that's immediately exxcuted:

```js
var value = (function() {
  return 3 + 2;
})();

var aFunction = function() {
  return 3 + 2;
};

var value = aFunction();
```

- Let's rewrite the `TheatreSeats()` constructor using an IIFF:

```js
var TheatreSeats = (function() {
  var seats = [];

  function TheatreSeatsConstructor() {
    this.maxSize = 10;
  }

  TheatreSeatsConstructor.prototype.placePerson = function(person) {
    seats.push(person);
  };

  //...

  return TheatreSeatsConstructor;
})();
```

**Crating a Meta-Closure with a IIFE:** The Shared Data Problem

- Since the **seats** array belongs to the anonymous function's closure, it is shared among all object instances created using the `TheatreSeats()` constructor:

```js
var t1 = new TheatreSeats();
var t2 = new TheatreSeats();

t1.placePerson({ name: "John", surname: "Smith" });

console.log(t1.countFreeSeats()); // 9
console.log(t2.countFreeSeats()); // 9 The available seats for t2 should be 10
```

### Managing Isolated Private Members

- Use a private object keeping private data for each object instance:

```js
var TheatreSeats = (function() {
  var priv = {};
  var id = 0;

  function TheatreSeatsConstructor() {
    this.id = id++;
    this.maxSize = 10;

    priv[this.id] = {};
    priv[this.id].seats = [];
  }

  // ...

  return TheatreSeatsConstructor;
})();
```

- Use the private object when you need to access internal data:

```js
TheatreSeatsConstructor.prototype.placePerson = function(person) {
  priv[this.id].seats.push(person);
};
```

### A Defintive Solution with WeakMap

- WeakMap is a collextion of key and value pairs where the key must be an object:

```js
var myMap = new WeakMap();
var johnSmith = { name: "John", surname: "Smith" };
var marioRossi = { name: "Mario", surname: "Rossi" };

myMap.set(johnSmith, "This is John");
myMap.set(marioRossi, "This is Mario");

console.log(myMap.get(marioRossi));

/*

Info: Start process (5:27:19 AM)
This is Mario
Info: End process (5:27:19 AM)

*/
```

### Using Property Descriptors Part -1

```js
var person = { name: "John", surname: "Smith" };

person.name;
person.name = "Mario";

// console.log(person);

/*

Info: Start process (8:18:35 AM)
{ name: 'Mario', surname: 'Smith' }
Info: End process (8:18:35 AM)

*/

person.surname = [1, 2];
console.log(person);

/*

Info: Start process (8:19:29 AM)
{ name: 'Mario', surname: [ 1, 2 ] }
Info: End process (8:19:29 AM)

*/
```

```js
var person = {
  name: "John",
  surname: "Smith",
  fullName: "John Smith",
  email: "john.smith@example.org"
};

// rewrite

var person2 = {
  name: "John",
  surname: "Smith",
  getFullname: function() {
    return this.name + " " + this.surname;
  },
  getEmail: function() {
    /* ... */
  }
};

console.log(person2.getFullname());

/*

Info: Start process (8:23:53 AM)
John Smith
Info: End process (8:23:53 AM)

*/
```

**Getter**

```js
var person = {
  name: "John",
  surname: "Smith",
  get getFullname() {
    return this.name + " " + this.surname;
  },
  email: "john.smith@example.org"
};

//console.log(person.getFullname()); // person.getFullname is not a function

console.log(person.getFullname);

/*

Info: Start process (8:30:42 AM)
John Smith
Info: End process (8:30:42 AM)

*/
```

**Getter & Setter**

```js
var person = {
  name: "John",
  surname: "Smith",
  get getFullname() {
    return this.name + " " + this.surname;
  },
  set fullName(value) {
    var parts = value.toString().split(" ");
    this.name = parts[0] || "";
    this.surname = parts[1] || "";
  },
  email: "john.smith@example.org"
};

// console.log(person.getFullname);
/*

Info: Start process (8:35:18 AM)
John Smith
Info: End process (8:35:18 AM)

*/

person.fullName = "Mario Rossi";
console.log(person.getFullname);
/*

Info: Start process (8:36:08 AM)
Mario Rossi
Info: End process (8:36:08 AM)

*/
```

**Object.defineProperty**

```js
var Person = (function() {
  function PersonConstructor() {
    this.name = "";
    this.surname = "";
    this.email = "";

    Object.defineProperty(this, "fullName", {
      get: function() {
        return this.name + " " + this.surname;
      },
      set: function(value) {
        var parts = value.toString().split(" ");
        this.name = parts[0] || "";
        this.surname = parts[1] || "";
      }
    });
  }

  return PersonConstructor;
})();

var johnSmith = new Person();
johnSmith.name = "John";
johnSmith.surname = "Smith";
console.log(johnSmith.fullName);
/*

Info: Start process (8:43:37 AM)
John Smith
Info: End process (8:43:37 AM)

*/
```

### Using Property Descriptors Part -2

- In addition to getters and setters, we apply the following constranints:
- **writable** Boolean that says whether the value of the property can be changed
- **configurable** Boolean that says whether the peoperty's descriptor can be changed or the property itself can be deleted
- **enumerable** Boolean indicating whether the property can be accessed in a loop over the object's properties
- **value** Represents the value accociated to the property; its default value is undefined\

```js
var Person = (function() {
  function PersonConstructor() {
    var _email = "";

    this.name = "";
    this.surname = "";

    Object.defineProperty(this, "fullName", {
      get: function() {
        return this.name + " " + this.surname;
      },
      set: function(value) {
        var parts = value.toString().split(" ");
        this.name = parts[0] || "";
        this.surname = parts[1] || "";
      }
    });

    Object.defineProperty(this, "email", {
      get: function() {
        return _email;
      },
      set: function(value) {
        var emailRegExp = /\w+@\w+\.\w{2,4}/i;
        if (emailRegExp.test(value)) {
          _email = value;
        } else {
          throw new Error("Invalid email address!");
        }
      }
    });
  }
  return PersonConstructor;
})();

var p = new Person();

p.email = "john.smith"; //throws exception
// throw new Error("Invalid email address!");
```

**WeakMap**

```js
var Person = (function() {
  var priv = new WeakMap();
  var _ = function(instance) {
    return priv.get(instance);
  };

  function PersonConstructor() {
    var privateMembers = { email: "" };
    priv.set(this, privateMembers);
    this.name = "";
    this.surname = "";
  }

  Object.defineProperty(PersonConstructor.prototype, "fullName", {
    get: function() {
      return this.name + " " + this.surname;
    }
  });

  Object.defineProperty(PersonConstructor.prototype, "email", {
    get: function() {
      return _(this).email;
    },
    set: function(value) {
      var emailRegExp = /\w+@\w+\.\w{2,4}/i;
      if (emailRegExp.test(value)) {
        _(this).email = value;
      } else {
        throw new Error("Invalid email address!");
      }
    }
  });

  return PersonConstructor;
})();
```

### Implementing Information Hiding in ES6 Classes

- Implementing the information hiding principle using the ES6 systax enhancements is not so different:

```js
var TheatreSeats = (function() {
  "use strict";
  var priv = new WeakMap();
  var _ = function(instance) {
    return priv.get(instance);
  };

  class TheatreSeatsClass {
    constructor() {
      var privateMembers = { seats: [] };
      priv.set(this, privateMembers);
      this.maxSize = 10;
    }

    placePerson(person) {
      _(this).seats.push(person);
    }

    countOccupiedSeats() {
      return _(this).seats.length;
    }

    isSoldOut() {
      return _(this).seats.length >= this.maxSize;
    }

    countFreeSeats() {
      return this.maxSize - _(this).seats.length;
    }
  }

  return TheatreSeatsClass;
})();
```

**ES6 Classes**

- Even implementing getters and setters with the ES6 syntax enhancements is not so different:

```js
var Person = (function() {
  "use strict";
  var priv = new WeakMap();
  var _ = function(instance) {
    return priv.get(instance);
  };

  class PersonClass {
    constructor() {
      var privateMembers = { email: "" };
      priv.set(this, privateMembers);
      this.name = "";
      this.surname = "";
    }

    get fullName() {
      return this.name + " " + this.surname;
    }

    get email() {
      return _(this).email;
    }

    set email(value) {
      var emailRegExp = /\w+@\w+\.\w{2,4}/i;

      if (emailRegExp.test(value)) {
        _(this).email = value;
      } else {
        throw new Error("Invalid email address!");
      }
    }
  }

  return PersonClass;
})();
```

### Leasson Summary

- Various techniques to implement encapsulation and informaiton hiding principles
- Using WeakMap is a better approach than using a property naming convention-based technique
- Couple of useful concepts, such as closures and Immediate Invoked Function Expressions (IIFE)
- Control access to public properties using getters, setters, and property descriptiors

### Quiz 2: Test your knowledge

1. How do other common OOP languages implement information hiding, that is, allow the defining of objects with a pulbic part and a private part?
   - With a special keyword called `hide` ❌
   - By prdfixing class members with an `_` (uncerscore) ❌
   - They apply encapsulation at compiler time, which means that the information is hidden by the time the application is executed. ❌
   - Many object-oriented languages, provide specific keywords such as public and private (access modifiers) to allow developers to easliy implement the information hiding principle. ❎
2. What benefits and drawbacks did you find in the Convention-Based aproach?
   - A drawback is that methods now need to be defined differently ❌
   - A benefit is that data types of internal members can now be set ❌
   - A drawback is that an underscore must be used at all times. ❌
   - There is no technical obstacle to prevent a developer using an internal member. ❎
3. Do you think that an IIFE must necessarily be an anonymous function?
   - Yes. ❌
   - Yes, but only when used in the browser. ❌
   - Yes, because a named function would be called an IINFE ❌
   - Event if an IIFE is usually an anonymous function, it is not required. You can use named functions, too. ❎
4. What is a garbage collector?
   - Collects unused code and shrinks the code base ❌
   - A daemon process looking for file changes ❌
   - A process to clear the entire memory ❌
   - A garbage collector automatically frees memory removing objects no longer used ❎
5. Which of the following benefits are provided by encapsulation and information hiding?
   - They hide internal complexity ❎
   - They expose internal behavoir for better understanding ❌
   - Thet provide a protectin for an object ❌
6. Which of the follwing sentences about the conventional-based approach are true?
   - All the private members of an object must start with `_` ❌
   - It offers an effective implementation of information hiding ❌
   - The private members of an object defined using it are accessible like the public ones ❎
7. What is a closure?
   - A way to classify privacy levels of an object member ❌
   - A context inside a function within which a variable is declared ❌
   - Environment consisting of any local variables, accessible when a funciton was declared ❎
   - The set of all global variables accessible by a function at runtime. ❌
8. What is a privileged member?
   - A public member of an object that uses private members ❎
   - A private member of an object that uses public members ❌
   - A private member of an object that uses private members ❌
   - A public member of an object that uses public members ❌
9. Which of the following sentences are ture?
   - An IIFE is a function passed as a parameter ❌
   - An IIFE is a function definition immediately executed ❌
   - An IIFE can only be an anonymous function ❌
   - An IIFE has no closure ❎
10. Why is using a WeakMap to create private members the best approach?
    - WeakMap wraps members inside a protected structure ❌
    - WeakMap offers access to shared data to each instance created by the constructor ❌
    - WeakMap sets a weak constraint while accessing provate member data ❌
    - WeakMap grants correct mamory management while storing private mamber data ❎
