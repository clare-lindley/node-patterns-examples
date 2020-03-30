'use strict';

//  1. Named exports (several per module)
// export const sqrt = Math.sqrt;
// export function square(x){
// 	return x * x;
// }
//
// export function diag(x,y){
// 	return sqrt(square(x)) + sqrt(square(y));
// }

// 2. Default exports (one per module)
export default function () {
	console.log('I am the default exported function')
};