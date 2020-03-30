'use strict';


import * as mathsmodule from './named-exports';

console.log(mathsmodule.LIGHTSPEED);
console.log(mathsmodule.square(3));
console.log(mathsmodule.sum(2,2));

// mathsmodule is an object whose properties are the named exports
console.log(Object.keys(mathsmodule)); // [ 'square', 'sum', 'LIGHTSPEED' ]
