'use strict';

// load another dependency
const dependency = require('./another-module');

// a private function
function log(){
	console.log(`Well done ${dependency.username}`);
}

// the API to be exported for public use
module.exports.run = () => {
	log();
}