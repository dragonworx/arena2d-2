/**
 * A arena.display.RadialGradient
 * @class
 */
arena.display.RadialGradient = function RadialGradient(x1, y1, r1, x2, y2, r2) {
	/** call super constructor */
	arena.display.Gradient.call(this);

	/** set default properties */
	this.x1 = x1 ? x1: 0;
	this.y1 = y1 ? y1: 0;
	this.r1 = r1 ? r1: 0;
	this.x2 = x2 ? x2: 0;
	this.y2 = y2 ? y2: 0;
	this.r2 = r2 ? r2: 0;
};

/** define arena.display.RadialGradient instance methods */
arena.display.RadialGradient.prototype = {
	set: function(x1, y1, r1, x2, y2, r2) {
		this.x1 = x1;
		this.y1 = y1;
		this.r1 = r1;
		this.x2 = x2;
		this.y2 = y2;
		this.r2 = r2;
		this.gradient = undefined;
	},
	createGradient: function(bitmap) {
		return bitmap.context.createRadialGradient(this.x1, this.y1, this.r1, this.x2, this.y2, this.r2);
	}
};

/***************************
 * arena.display.RadialGradient *
 ***************************/
arena.display.RadialGradient.toClass(
	/*domainName*/ 'arena.display.RadialGradient',
	/*superClass*/ arena.display.Gradient,
	/*instance.properties*/ ['x1', 'y1', 'r1', 'x2', 'y2', 'r2']
).temporary();