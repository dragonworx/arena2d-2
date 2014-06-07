/**
 * A arena.geometry.Ratio
 * @class
 */
arena.geometry.Ratio = function Ratio(x, y) {
	/** call super constructor */
	arena.Object.call(this);

	/** set default properties */
	this.x = x;
	this.y = y;
};

/** define arena.geometry.Ratio instance methods */
arena.geometry.Ratio.prototype = {
	set: function(x, y) {
		this.x = x;
		this.y = y;
		return this;
	},
	clear: function() {
		this.x = this.y = undefined;
		return this;
	}
};

/***************************
 * arena.geometry.Ratio *
 ***************************/
arena.geometry.Ratio.toClass(
	/*domainName*/ 'arena.geometry.Ratio',
	/*superClass*/ arena.Object,
	/*instance.properties*/ ['x', 'y']
).temporary();

window.ratio = function(x, y) {
	return arena.geometry.Ratio.temp.set(x, y);
};