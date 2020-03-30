'use strict';

import {counter, incCounter} from './counter';

// counter is mutable but only via the exported incCounter() method
console.log(counter);
incCounter();
console.log(counter);

// this will throw Error: "counter" is read-only! NICE!
// Imports are read-only views on exports
// counter++;