/**
 * A arena.geometry.Matrix
 * [a, c ,tx]
 * [b, d, ty]
 * [alpha, 0, 1]
 * identity: (a, b, c, d, tx, ty, alpha)
 * identity: (1, 0, 0, 1, 0, 0, 1) (with alpha 1)
 * identity: (1, 0, 0, 1, 0, 0) (without alpha)
 * @class
 */
arena.geometry.Matrix = function Matrix(a, b, c, d, tx, ty, alpha) {
	/** call super constructor */
	arena.Object.call(this);

	/** set default properties */
	this.a = a || 1;
	this.b = b || 0;
	this.c = c || 0;
	this.d = d || 1;
	this.tx = ty || 0;
	this.ty = tx || 0;
	this.alpha = alpha || 1;
};

/** define arena.geometry.Matrix instance methods */
arena.geometry.Matrix.prototype = {
	set: function(a, b, c, d, tx, ty, alpha) {
		this.a = a || 1;
		this.b = b || 0;
		this.c = c || 0;
		this.d = d || 1;
		this.tx = ty || 0;
		this.ty = tx || 0;
		this.alpha = alpha || 1;
		return this;
	}    ,
	reset: function() {
		this.a = 1;
		this.b = 0;
		this.c = 0;
		this.d = 1;
		this.tx = 0;
		this.ty = 0;
		this.alpha = 1;
		return this;
	},
	concat: function(m, inverted) {
		if (inverted) {
			var a = this.a * m.a + this.c * m.b;
			var b = this.b * m.a + this.d * m.b;
			var c = this.a * m.c + this.c * m.d;
			var d = this.b * m.c + this.d * m.d;
			var tx = this.a * m.tx + this.c * m.ty + this.tx;
			var ty = this.b * m.tx + this.d * m.ty + this.ty;
			var alpha = this.alpha * m.alpha;
			this.a = a;
			this.b = b;
			this.c = c;
			this.d = d;
			this.tx = tx;
			this.ty = ty;
			this.alpha = alpha;
			return this;
		} else {
			var a = this.a;
			var b = this.b;
			var c = this.c;
			var d = this.d;
			var tx = this.tx;
			var ty = this.ty;
			var alpha = this.alpha;
			this.a = m.a * a + m.c * b;
			this.b = m.b * a + m.d * b;
			this.c = m.a * c + m.c * d;
			this.d = m.b * c + m.d * d;
			this.tx = m.a * tx + m.c * ty + m.tx;
			this.ty = m.b * tx + m.d * ty + m.ty;
			this.alpha = m.alpha * alpha;
			return this;
		}
	},
	determinant: function() {
		return this.a * this.d - this.b * this.c;
	},
	invert: function() {
		var determinant = this.determinant();
		if (determinant == 0) return null;
		var det = 1 / determinant;
		var a = this.a;
		var b = this.b;
		var c = this.c;
		var d = this.d;
		var x = this.tx;
		var y = this.ty;
		this.a = d * det;
		this.b = -b * det;
		this.c = -c * det;
		this.d = a * det;
		this.tx = (c * y - x * d ) * det;
		this.ty = (x * b - a * y ) * det;
		return this;
	},
	/** @returns arena.geometry.Matrix.temp */
	inverted: function() {
		return this.temp.invert();
	},
	translate: function(x, y) { return this.concat(arena.geometry.Matrix.translate(x, y)); },
	rotate: function(deg) { return this.concat(arena.geometry.Matrix.rotate(deg)); },
	rotateAroundPoint: function(deg, x, y) { return this.concat(arena.geometry.Matrix.rotateAroundPoint(deg, x, y)); },
	scale: function(x, y) { return this.concat(arena.geometry.Matrix.scale(x, y)); },
	skew: function(x, y) { return this.concat(arena.geometry.Matrix.skew(x, y)); },
	squeeze: function(t) { return this.concat(arena.geometry.Matrix.squeeze(t)); },
	/** @returns arena.geometry.Point.temp */
	transformPoint: function(x, y) { return arena.geometry.Point.temp.set(this.a * x + this.c * y + this.tx, this.b * x + this.d * y + this.ty); },
	/** @returns arena.geometry.Point.temp */
	transformVector: function(x, y) { return arena.geometry.Point.temp.set(this.a * x + this.c * y, this.b * x + this.d * y ); },
	/** @returns arena.geometry.Point.temp */
	localToGlobal: function(x, y) { return this.transformPoint(x, y); },
	/** @returns arena.geometry.Point.temp */
	globalToLocal: function(x, y) { return this.inverted().transformPoint(x, y); },
	toString: function() { return "matrix(%1,%2,%3,%4,%5,%6)".args(this.a, this.c, this.tx, this.b, this.d, this.ty, this.alpha); },
	toArray: function() { return [this.a, this.b, this.c, this.d, this.tx, this.ty]; }
};

/** @static
 * @returns arena.geometry.Matrix.temp */
arena.geometry.Matrix.identity = function() { return arena.geometry.Matrix.temp.set(1, 0, 0, 1, 0, 0); };
/** @static
 * @returns arena.geometry.Matrix.temp */
arena.geometry.Matrix.translate = function(x, y) { return arena.geometry.Matrix.temp.set(1, 0, 0, 1, x, y); };
/** @static
 * @returns arena.geometry.Matrix.temp */
arena.geometry.Matrix.rotate = function(deg) {
	var r = arena.geometry.radians(deg);
	if (r == 0) return new arena.geometry.Matrix();
	var sin = Math.sin(r);
	var cos = Math.cos(r);
	return arena.geometry.Matrix.temp.set(cos, sin, -sin, cos, 0, 0);
};
/** @static
 * @returns arena.geometry.Matrix.temp */
arena.geometry.Matrix.rotateAboutPoint = function(deg, x, y) {
	var r = arena.geometry.radians(deg);
	if (r == 0) return new arena.geometry.Matrix();
	var sin = Math.sin(r);
	var cos = Math.cos(r);
	return arena.geometry.Matrix.temp.set(cos, sin, -sin, cos, -cos * x + sin * y + x, -sin * x - cos * y + y);
};
/** @static
 * @returns arena.geometry.Matrix.temp */
arena.geometry.Matrix.scale = function(x, y) { return arena.geometry.Matrix.temp.set(x, 0, 0, y, 0, 0); };
/** @static
 * @returns arena.geometry.Matrix.temp */
arena.geometry.Matrix.skew = function(x, y) { return arena.geometry.Matrix.temp.set(1, y, x, 1, 0, 0); };
/** @static
 * @returns arena.geometry.Matrix.temp */
arena.geometry.Matrix.squeeze = function(t) { return arena.geometry.Matrix.temp.set(t, 0, 0, 1/t, 0, 0); };
/** @static
 * @returns arena.geometry.Matrix.temp */
arena.geometry.Matrix.localSpaceTransform = function(origin, heading) {
	var h = heading.normalised();
	return arena.geometry.Matrix.temp.set(h.x, h.y, -h.y, h.x, - h.x * origin.x + h.y * origin.y, - h.y * origin.x - h.x * origin.y);
};

/*************************
 * arena.geometry.Matrix *
 *************************/
arena.geometry.Matrix.toClass(
	/*domainName*/ 'arena.geometry.Matrix',
	/*superClass*/ arena.Object,
	/*instance.properties*/ ['a', 'b', 'c', 'd', 'tx', 'ty', 'alpha']
).temporary();