'use strict'

/**
 * Wrap the module src code inside a self-calling function
 * The variables passed into the module are initialised by
 * the arguments passed into the self-calling function
 */
function loadModule(filename, module, require){
	// here we just hardcode an example of some evaluted module code
	const wrappedSrc = `(function(module, exports, require){
		${fs.readFileSync(filename, 'utf8')}
	})(module, module.exports, require);`;
	eval(wrappedSrc);
}


// 1. A Module name is accepted as input
const require = (moduleName) => {
	console.log(`require invoked for ${moduleName}`);
  // and the first thing we do is get the full path (RESOLVE) of the module
	// which we call 'id'
	const id = require.resolve(moduleName);

	// 2. If the module has already been loaded we just return the cached version immediately
	if(require.cache[id]) {
		return require.cache[id].exports;
	}

	// 3. if the module was not loaded yet, we set up the environment for the first load
	// In particular we create a module object that contains an exports property
	// initialised with an empty object literal.

	// The 'exports' property is what the module can use to export its public API
	const module = {
		exports: {},
		id: id
	};

	// 4. The module object is cached
	require.cache[id] = module;

	// 5. The module source code is loaded and evaluated. We provide the module
	// with the module object that we just created and a REFERENCE to the require
	// function (why?). The module exports its public API by manipulating or replacing
	// the module.exports object.
	loadModule(id, module, require);

	// 6. Finally, return the contents of module.exports once they've been populated
	// by the loaded module we just evaluated. SWEET!

	// so there's a contract between require() and the module.
	// if require returns module.exports, the module has to use that to export its
	// public API
	return module.exports;
}
require.cache = {};
require.resolve = (moduleName) => {
	// resolve a full module id from the module name
}