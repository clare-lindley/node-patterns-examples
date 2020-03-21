'use strict'

/**
 *
 * The Revealing module pattern
 *
 * Here, we have a self calling function assigned to the const 'module'
 * Everything gets invoked immediately.
 *
 * You can protect the data inside the Subjects and Children arrays
 * by only making them accessible via the public interface.
 *
 * QUESTION - how can I break it? What is a less safe way that this is the solution to?
 *
 *
 */
const schoolModule = (() => {

	const subjects = ['Numeracy', 'Literacy'];
	const privateSubjects = (subject) => {
		subjects.push(subject);
	};
	const privateChildren= ['mary', 'cara', 'joe'];

	const exported = {
		publicAddChild: (child) => {
			privateChildren.push(child);
		},
		publicAddSubject: (subject) => {
			privateSubjects(subject);
		}
	};

	return exported;

})();

schoolModule.publicAddChild('Emily');
schoolModule.publicAddSubject('History');


// another eg of writing a self calling function
// const selfCalling = (function(){
// 	console.log('also?');
// })();
