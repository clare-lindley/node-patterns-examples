'use strict';

import fs from 'fs';

const file_not_exist = 'dataAAAAAAGHNOTHERE.txt';
const file_exist = 'data.txt';

/**
 * Callback conventions in node:
 * 1. Callbacks come last
 * 2. First argument to a callback is always the error. If you're
 * implementing your own asuync API using callbacks it's up to you
 * to make sure you run the callback with the error object or null
 * if there are no errors
 */

fs.readFile(file_not_exist, 'utf-8', (err, data) => {

	if(err) {
		handleError(err);
	}
	else {
		processData(data);
	}

});

fs.readFile(file_exist, 'utf-8', (err, data) => {

	if(err) {
		handleError(err);
	}
	else {
		processData(data);
	}

});

const handleError = function(err){
	console.log(`Lord jesus there was a fire ${err.message}`);
}

const processData = function(data) {
	console.log(data);
}



