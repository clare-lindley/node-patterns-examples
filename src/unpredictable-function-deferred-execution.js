

const fs = require('fs');
const cache = {};


// Deferred execution baby!
function consistentRead(filename, callback) {

	if (cache[filename]) {
		// make this guaranteed to run in the next cycle of the event loop using process.nextTick()
		process.nextTick(() => callback(cache[filename]));
	}
	else {
		fs.readFile(filename, 'utf-8', (err, data) => {
			cache[filename] = data;
			// executed in the NEXT cycle of the event loop as the event loop has to go around once to come back
			// and see if there's data available yet to call the handler with
			callback(data);
		});
	}
}

function createFileReader(filename) {

	const listeners = [];

	consistentRead(filename, value => {
		listeners.forEach(listener => listener(value));
	});

	return {
		whenWeHaveDataDoThis: listener => listeners.push(listener)
	};
}

// 1. GO OFF AND DO YOUR ASYNC THING and give control back to the EVENT LOOP
// thus allowing a new event from the loop to be processed
const reader1 = createFileReader('data.txt');

// 2. SYNCHRONOUSLY REGISTER SOMETHING TO DO WHEN WE HAVE THE DATA
reader1.whenWeHaveDataDoThis(data => {

	// here we're in the listener that we've told createFileReader() to call when we get data.
	// so far so good, we did an async call because it was the first time around.
	console.log('Listener one function has data now:  \n' + data);

	// some time later we want to try again.
	const reader2 = createFileReader('data.txt');

	// on the same event loop cycle register the listener
	reader2.whenWeHaveDataDoThis(data => {

		// this time, we get here because the callback happened on the next cycle of the event loop
		// using process.nextTick() - hurrah!
		console.log('Listener two function has data now:  \n' + data);
	});


});







