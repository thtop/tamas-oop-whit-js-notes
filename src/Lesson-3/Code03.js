class Person {
  constructor(name, surname) {
    this.name = name;
	this.surname = surname;
  }
}

class Developer extends Person {
  constructor(name, surname, knownLanguage) {
	super(name, surname);
	this. knownLanguage = knownLanguage;
  }
}