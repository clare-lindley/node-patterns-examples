'use strict';

const my_first_module = require('./my-first-module');

my_first_module.run();

console.log(my_first_module.name);

my_first_module.sayName('Emily');

my_first_module.Foo.init();