jQuery.noConflict();

Object.defineProperty(jQuery.fn, 'element', {
	get: function() { return this[0]; },
	enumerable: false,
	configurable: false
});