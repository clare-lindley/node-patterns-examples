'use strict';

import fs from 'fs';

function readJSON(filename, callback){

	// throw new Error('We\'re in readJSON');

	fs.readFile(filename, (err, data) =>  {

		// there may be an error from fs.readFile so handle that
		if (err)
			return callback(err); // propagate the error and exit the function

		// what happens here? if anything throws an error here, it travels from the callback
		// to the stack and then into the event loop where it is thrown and the app crashes
		// we DO NOT PROPAGATE TO readJSON as this has returned by now and is off the stack!
		return callback(null, JSON.parse(data));

	});
}

// Why doesn't this catch the JSON.parse() error?
// because the error isn't thrown in readJSON().
// it's thrown in the callback for fs.readFile, when we attempt to
// parse the invalid JSON.
// putting a try/catch around this function call doesn't catch errors thrown
// inside the callback. It WILL catch errors thrown inside readJSON() tho!

// try {
// 	readJSON('data.txt', callback);
// } catch(error) {
// 	handleError(error);
// }

/**
 *
 * How to handle uncaught exceptions
 */

readJSON('data.txt', callback);

process.on('uncaughtException', (err) => {
	console.error(`Crash bang wallop! What an uncaught Exception! ${err.message}`);
	process.exit(1);
});

function callback(err, data){

	if(err) {
		handleError(err);
	}
	else {
		processData(data);
	}

}

function handleError(err){
	console.log(`Lord jesus there was a fire ${err.message}`);
}

function processData(data) {
	console.log(data);
}



