'use strict';

import fs from 'fs';

function readJSON(filename, callback){
	fs.readFile(filename, (err, data) =>  {

		let parsed;

		// ok there may be an error from fs.readFile so handle that
		if (err)
			return callback(err); // propagate the error and exit the function

		// then there may be an error from parsing the data so handle that
		try {
			parsed = JSON.parse(data);
		} catch(err) {
			return callback(err); // propagate the error and exit the function
		}

		// no errors, propagate the data to the callback
		callback(null, parsed);

	});
}

const filenames = [
	'dataAAAAAAGHNOTHERE.txt',
	'data.txt',
	'json.txt'
];

const callback = (err, data) => {

	if(err) {
		handleError(err);
	}
	else {
		processData(data);
	}

}

// just a reminder - for...of is interested in the VALUES of iterable objects. for...in is
// interested in all enumerable properties and may be overkill here.
for (let filename of filenames) {
	readJSON(filename, callback);
}

const handleError = function(err){
	console.log(`Lord jesus there was a fire ${err.message}`);
}

const processData = function(data) {
	console.log(data);
}

