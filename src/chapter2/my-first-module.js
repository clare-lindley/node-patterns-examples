'use strict';

/**
 * My mental model of how module.exports and exports work:

exports is a reference to the object literal module.exports
if you are ok with your public interface being on object literal, use this
exports.name = 'Clare'
exports.sayName = () => {
	console.log('Clare');
}

1. when you add stuff to exports, you're adding it to module.exports
2. when you reassign exports, it won't do anything, all it will do is change
where exports points to!

3. if you want to override module.exports to be anything other than an object literal you
have to do it like this:
module.exports = () => {
	console.log('hello');
}

 */

// load dependency
const dependency = require('./another-module');

// a private function
function log(){
	console.log(`Well done ${dependency.username}`);
}

// the API to be exported for public use - note we're sticking with module.exports
// as an object literal here and assigning properties to it, rather than redeclaring
// it as a function, instance or string (for example - as you can do, if you wish!)
exports.run = () => {
	log();
}

exports.name = 'Clare';

exports.sayName = (name) => {
	console.log(name);
}

const Foo = {
	init: () => {
		console.log('Foo.init was called');
	}
}

exports.Foo = Foo;

