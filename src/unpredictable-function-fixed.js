

const fs = require('fs');
const cache = {};

function consistentReadSync(filename) {
	if (cache[filename]) {
		return cache[filename];
	}
	else {
		return cache[filename] = fs.readFileSync(filename, 'utf-8');
	}
}

function createFileReader(filename) {
	return consistentReadSync(filename);
}

/**
 * This all happens in the same cycle of the event loop.
 * If the first file is massive, we gonna get a blockage Dave!
 */

const data1 = createFileReader('2gb-file.txt'); // this is now blocking
console.log('we have data from 1st call ' + data1);

const data2 = createFileReader('data.txt');
console.log('we have data from 2nd call ' + data2);





