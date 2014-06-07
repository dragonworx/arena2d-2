/**
 * A arena.display.Color.Rgb
 * @class
 */
arena.display.Color.Rgb = function Rgb(r, g, b) {
	/** call super constructor */
	arena.display.Color.call(this);

	this.red = r || 0;
	this.green = g || 0;
	this.blue = b || 0;
};

/** define arena.display.Color.Rgb instance methods */
arena.display.Color.Rgb.prototype = {
	toCss: function() {
		return 'rgba(%1,%2,%3,%4)'.args(this.red, this.green, this.blue, this.alpha);
	},

	toRgbArray: function() {
		return Array.tempFrom(this.red, this.green, this.blue);
	}
};

/***************************
 * arena.display.Color.Rgb *
 ***************************/
arena.display.Color.Rgb.toClass(
	/*domainName*/ 'arena.display.Color.Rgb',
	/*superClass*/ arena.display.Color,
	/*instance.properties*/ ['red', 'green', 'blue']
).temporary();