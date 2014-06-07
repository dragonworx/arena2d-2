function isUndefined(obj) { return typeof obj == "undefined"; }
function isDefined(obj) { return !isUndefined(obj); }

Function.contexts = {};

Function.prototype.context = function(context) {
	// lazy initialise a hash of contexts for this function
	if (!Function.contexts[this])
		Function.contexts[this] = {};

	// lazy initialise a wrapper of this function using the given context
	if (!Function.contexts[this][context.hash]) {
		var thisFunction = this;
		//console.log("setting context for " + context.hash);
		Function.contexts[this][context.hash] = function() {
			return thisFunction.apply(context, arguments);
		};
	}

	/** @returns a wrapper of this function using the given context */
	return Function.contexts[this][context.hash];
};

Function.clearContexts = function() {
	for (var fn in Function.contexts) {
		 for (var hash in Function.contexts[fn]) {
			 //console.log("clearing context for " + hash);
		 }
	}
	Object.clear(Function.contexts);
};

Function.prototype.functionName = null;

Object.defineProperty(Function.prototype, 'functionName', {
	get: function() {
		var name = this.toString().match(/^function ([\$a-zA-Z0-9_]+)/);
		if (name == null)
			return null;
		else
			return name[1];
	},
	configurable: false,
	enumerable: false
});

window.globalVars = function(vars) {
	for (var key in vars) window[key] = vars[key];
	return window;
};

jQuery(window).unload(function() {
	Function.clearContexts();
	//console.log("* arena-object.unloaded!");
});