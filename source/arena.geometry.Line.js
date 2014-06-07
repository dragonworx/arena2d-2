/**
 * A arena.geometry.Line
 * @class
 */
arena.geometry.Line = function Line(x1, y1, x2, y2) {
	/** call super constructor */
	arena.Object.call(this);

	/** set default properties */
	this.x1 = x1;
	this.y1 = y1;
	this.x2 = x2;
	this.y2 = y2;
};

arena.geometry.Line.X1_CHANGED = 'x1Changed';
arena.geometry.Line.Y1_CHANGED = 'y1Changed';
arena.geometry.Line.X2_CHANGED = 'x2Changed';
arena.geometry.Line.Y2_CHANGED = 'y2Changed';

/** define arena.geometry.Line instance methods */
arena.geometry.Line.prototype = {
	isNaN: function() {
		return isNaN(this.x1) || isNaN(this.y1) || isNaN(this.x2) || isNaN(this.y2);
	},
	set: function(x1, y1, x2, y2) {
		this.x1 = x1;
		this.y1 = y1;
		this.x2 = x2;
		this.y2 = y2;
		return this;
	},
	clear: function() {
		this.x1 = this.y1 = this.x2 = this.y2 = undefined;
	},
	at: function(value) { return arena.geometry.Point.temp.set(this.x1 + ((this.x2 - this.x1) * value), this.y1 + ((this.y2 - this.y1) * value)); },
	angle: function() { return arena.geometry.angle(this.x1, this.y1, this.x2, this.y2); },
	length: function () { return arena.geometry.length(this.x1, this.y1, this.x2, this.y2); },
	toString: function() {
		return 'line(%1,%2,%3,%4)'.args(this.x1, this.y1, this.x2, this.y2);
	}
};

/***************************
 * arena.geometry.Line *
 ***************************/
arena.geometry.Line.toClass(
	/*domainName*/ 'arena.geometry.Line',
	/*superClass*/ arena.Object,
	/*instance.properties*/ ['x1', 'y1', 'x2', 'y2']
).temporary();

window.line = function(x1, y1, x2, y2) {
	return arena.geometry.Line.temp.set(x1, y1, x2, y2);
};