'use strict';


// Not exported, private to module
function times(a, b) {
	return a * b;
}

// public API - this is exported
function sq(x) {
	return times(x, x);
}

// public API - this is exported
export function sum(x, y) {
	return x + y;
}

// public constant - this is exported
const LS = 299792458;

export {
	sq as square,
	LS as LIGHTSPEED,
};