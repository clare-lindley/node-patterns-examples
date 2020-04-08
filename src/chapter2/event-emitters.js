'use strict';

// this is not an ES6 module, it's module.exports = EventEmitter;

import EventEmitter from 'events';
import fs from 'fs';

/**
 *
 * So, you could give it a callback and call that with the error or the successful whatever...
 * OR
 * you could create an event emitter if you want more flexibility over what to respond to,
 * like in this case you need to know about the file being READ as well as
 * the usual error and 'success-here's-the-result' cases.
 *
 * Error handling with event emitters is the same
 * principle as callbacks - you can't put a try.. catch around a function that uses event emitters
 * with asynchronous functions, as the errors don't propagate to the function that called it, that's
 * returned and long gone - they just get lost in the event loop :( sad.
 *
 * Best practise is to emit an error - don't throw it - and handle it with on('error'...).
 *
 *
 *
 */
function findPattern(files, regex) {

	const emitter = new EventEmitter();
	files.forEach((file) => {
		let path = `${__dirname}/${file}`;
		fs.readFile(path, 'utf-8', (err, content) => {
			if(err){
				emitter.emit('error', err);
			}
			else {
				emitter.emit('fileread', file);
				let match;
				if(match = content.match(regex)) {
					match.forEach(elem => emitter.emit('found', file, elem));
				}
			}
		});
	});

	return emitter;
}



findPattern(
	['fileA.txt', 'fileB.txt', 'fileC.txt'],
	/hello \w/g
	)
	.on('fileread', file => console.log(`${file} was read`))
	.on('found', (file, match) => console.log(`matched ${match} in ${file}`))
	.on('error', error => console.log(`Uh oh there's an error message ${error.message}`));



