/**
 * A abstract class to represent color used in 2d painting operations
 * @class arena.display.Color
 */
arena.display.Color = function Color(alpha) {
	/** call super constructor */
	arena.Object.call(this);

	this.alpha = alpha || 1;
};

/** define arena.display.Color instance methods */
arena.display.Color.prototype = {
	toString: function() {
		return this.toCss();
	},
	/** @returns {string} a CSS representation of this colors hex value */
	toCss: function() {
		return '';
	},

	/** @returns {Array} Array.temp with this as rgb components */
	toRgba: function() {
		this.toRgbArray();
		return new arena.display.Color.Rgb(Array.temp[0], Array.temp[1], Array.temp[2], this.alpha);
	},

	/** @returns {Array} [red, green, blue] values between 0 - 255 */
	toRgbArray: function() { return Array.tempFrom(0, 0, 0); },

	average: function() {
		var array = this.toRgbArray();
		return 0.2126 * array[0] + 0.7152 * array[1] + 0.0722 * array[3];
	}
};

/***********************
 * arena.display.Color *
 ***********************/
arena.display.Color.toClass(
	/*domainName*/ 'arena.display.Color',
	/*superClass*/ arena.Object,
	/*instance.properties*/ ['alpha']
).temporary();