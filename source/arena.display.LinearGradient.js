/**
 * A arena.display.LinearGradient
 * @class
 */
arena.display.LinearGradient = function LinearGradient(x1, y1, x2, y2) {
	/** call super constructor */
	arena.display.Gradient.call(this);

	/** set default properties */
	this.x1 = x1 || 0;
	this.y1 = y1 || 0;
	this.x2 = x2 || 0;
	this.y2 = y2 || 0;

};

/** define arena.display.LinearGradient instance methods */
arena.display.LinearGradient.prototype = {
	set: function(x1, y1, x2, y2) {
		this.x1 = x1;
		this.y1 = y1;
		this.x2 = x2;
		this.y2 = y2;
		this.gradient = undefined;
	},
	createGradient: function(bitmap) {
		return bitmap.context.createLinearGradient(this.x1, this.y1, this.x2, this.y2);
	}
};

/***************************
 * arena.display.LinearGradient *
 ***************************/
arena.display.LinearGradient.toClass(
	/*domainName*/ 'arena.display.LinearGradient',
	/*superClass*/ arena.display.Gradient,
	/*instance.properties*/ ['x1', 'y1', 'x2', 'y2']
).temporary();