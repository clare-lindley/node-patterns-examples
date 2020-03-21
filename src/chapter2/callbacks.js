'use strict';

// the result is passed back to the caller using the return instruction - so far so good!
// this is the most common way of returning in synchronous programming
function addSync(a,b, callback) {
	callback(a + b);
}

console.log('before');
addSync(1,2, result => console.log(`result: ${result}`));
console.log('after');


function additionAsync(a, b, callback) {
	// here it's setTimeout() that returns execution back to additionAsync and then to it's caller.
	// we don't wait here for the callback to be completed.
	setTimeout(() => callback(a + b), 100);
}

console.log('before async');
additionAsync(1,2, result => console.log(`result: ${result}`));
console.log('after async');

