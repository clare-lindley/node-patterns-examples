'use strict';

import {LIGHTSPEED} from './named-exports'
import {sum} from './named-exports'
// renaming the import
import {square as claresquare} from './named-exports'

console.log(LIGHTSPEED);
console.log(claresquare(3));
console.log(sum(2,2));