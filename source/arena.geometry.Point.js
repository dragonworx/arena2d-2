/**
 * A arena.geometry.Point
 * @class
 */
arena.geometry.Point = function Point(x, y) {
	/** call super constructor */
	arena.Object.call(this);

	/** set default properties */
	this.x = x;
	this.y = y;
};

arena.geometry.Point.X_CHANGED = 'xChanged';
arena.geometry.Point.Y_CHANGED = 'yChanged';

/** define arena.geometry.Point instance methods */
arena.geometry.Point.prototype = {
	isNaN: function() {
		return isNaN(this.x) || isNaN(this.y);
	},
	set: function(x, y) {
		this.x = x;
		this.y = y;
		return this;
	},
	setX: function(x) {
		this.x = x;
		return this;
	},
	setY: function(y) {
		this.y = y;
		return this;
	},
	clear: function() {
		this.x = this.y = undefined;
		return this;
	},
	/** @returns arena.geometry.Point.temp */
	plus: function(point) { return arena.geometry.Point.temp.set(this.x + point.x, this.y + point.y); },
	/** @returns arena.geometry.Point.temp */
	plusXY: function(x, y) { return arena.geometry.Point.temp.set(this.x + x, this.y + y); },
	/** @returns arena.geometry.Point.temp */
	plusX: function(x) { return this.plusXY(x, 0); },
	/** @returns arena.geometry.Point.temp */
	plusY: function(y) { return this.plusXY(0, y); },
	move: function(point) {
		this.x += point.x;
		this.y += point.y;
		return this;
	},
	moveXY: function(x, y) {
		this.x += x;
		this.y += y;
		return this;
	},
	moveX: function(x) { return this.move(x, 0); },
	moveY: function(y) { return this.move(0, y); },
	rotate: function(deg, aroundThisPoint) {
		var radians = arena.geometry.radians(deg);
		var s = Math.sin(radians);
		var c = Math.cos(radians);
		if (aroundThisPoint) {
			var x = this.x;
			var y = this.y;
			x -= aroundThisPoint.x;
			y -= aroundThisPoint.y;
			var xnew = x * c - y * s;
			var ynew = x * s + y * c;
			this.x = xnew + aroundThisPoint.x;
			this.y = ynew + aroundThisPoint.y;
		} else {
			this.x = this.x * c - this.y * s;
			this.y = this.x * s + this.y * c;
		}
		return this;
	},
	/** @returns arena.geometry.Point.temp */
	rotated: function(deg, aroundThisPoint) {
		return this.temp.rotated(deg, aroundThisPoint);
	},
	scale: function(x, y) {
		this.x = this.x * x;
		this.y = this.y * (y ? y : x);
		return this;
	},
	/** @returns arena.geometry.Point.temp */
	scaled: function(x, y) {
		return this.temp.scale(x, y);
	},
	travel: function(deg, length) {
		return this.move(arena.geometry.polarPoint(deg, length));
	},
	/** @returns arena.geometry.Point.temp */
	traveled: function(deg, length) {
		return this.plus(arena.geometry.polarPoint(deg, length));
	},
	/** @returns arena.geometry.Point.temp */
	interpolatedTo: function(x, y, interplolatedAmount) {
		return arena.geometry.Point.temp.set(this.x + ((x - this.x) * interplolatedAmount), this.y + ((y - this.y) * interplolatedAmount));
	},
	length: function(x, y) { return arena.geometry.length(this.x, this.y, x, y); },
	angle: function(x, y) { return arena.geometry.angle(this.x, this.y, x, y); },
	ceil: function() { return this.set(Math.ceil(this.x), Math.ceil(this.y)); },
	floor: function() { return this.set(Math.floor(this.x), Math.floor(this.y)); },
	round: function() { return this.set(Math.round(this.x), Math.round(this.y)); },
	/** @returns arena.geometry.Point.temp */
	rounded: function() { return this.temp.round(); },
	/** @returns arena.geometry.Point.temp */
	floored: function() { return this.temp.floor(); },
	/** @returns arena.geometry.Point.temp */
	ceiled: function() { return this.temp.ceil(); },
	normalise: function() {
		var l = this.length();
		this.x = this.x / l;
		this.y = this.y / l;
		return this;
	},
	/** @returns arena.geometry.Point.temp */
	normalised: function() { return this.temp.normalise(); },
	at: function(y) {
		this.y = y;
		return this;
	},
	/** @returns arena.geometry.Line.temp */
	to: function(point) { return arena.geometry.Line.temp.set(this.x, this.y, point.x, point.y); },
	/** @returns arena.geometry.Rectangle.temp */
	corner: function(point) { return arena.geometry.Rectangle.temp.set(this.x, this.y, point.x - this.x, point.y - this.y); },
	/** @returns arena.geometry.Rectangle.temp */
	size: function(w, h, originx, originy) { return arena.geometry.Rectangle.temp.set(this.x - (originx || 0), this.y - (originy || 0), w, h); },
	toShortString: function() { return '%1,%2'.args(this.x, this.y) },
	toString: function() {
		return 'point(%1,%2)'.args(this.x, this.y);
	}
};

/***************************
 * arena.geometry.Point *
 ***************************/
arena.geometry.Point.toClass(
	/*domainName*/ 'arena.geometry.Point',
	/*superClass*/ arena.Object,
	/*instance.properties*/ ['x', 'y']
).temporary();

window.point = function(x, y) {
	return arena.geometry.Point.temp.set(x, y);
};

Number.prototype.at = function(num) {
	return arena.geometry.Point.temp.set(parseFloat(this), num);
};

/** test class asserts here */
arena.geometry.Point.assert = function() {

};