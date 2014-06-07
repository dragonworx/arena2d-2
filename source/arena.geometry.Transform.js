/**
 * A arena.geometry.Transform
 * @class
 */
arena.geometry.Transform = function Transform() {
	/** call super constructor */
	arena.Object.call(this);

	/** set default properties */
	this.size = new arena.geometry.Size();
	this.origin = new arena.geometry.Point(0, 0);
	this.translation = new arena.geometry.Point(0, 0);
	this.rotation = 0;
	this.scale = new arena.geometry.Ratio(1, 1);
	this.skew = new arena.geometry.Ratio(0, 0);
	this.tilt = new arena.geometry.Ratio(1, 1);
	this.squeeze = 1;
	this.alpha = 1;

	this._matrix = new arena.geometry.Matrix();

	this._modified = true;

	this.size.addEvent(arena.Object.CHANGED, this.onChanged, this);
	this.origin.addEvent(arena.Object.CHANGED, this.onChanged, this);
	this.translation.addEvent(arena.Object.CHANGED, this.onChanged, this);
	this.addEvent(arena.geometry.Transform.ROTATION_CHANGED, this.onChanged, this);
	this.scale.addEvent(arena.Object.CHANGED, this.onChanged, this);
	this.skew.addEvent(arena.Object.CHANGED, this.onChanged, this);
	this.tilt.addEvent(arena.Object.CHANGED, this.onChanged, this);
	this.addEvent(arena.geometry.Transform.SQUEEZE_CHANGED, this.onChanged, this);
	this.addEvent(arena.geometry.Transform.ALPHA_CHANGED, this.onChanged, this);
};

arena.geometry.Transform.CHANGED = 'changed';
arena.geometry.Transform.ROTATION_CHANGED = 'rotationChanged';
arena.geometry.Transform.SQUEEZE_CHANGED = 'squeezeChanged';
arena.geometry.Transform.ALPHA_CHANGED = 'alphaChanged';

/** define arena.geometry.Transform instance methods */
arena.geometry.Transform.prototype = {
	matrix: undefined,
	reset: function() {
		this.size.clear();
		this.origin.set(0, 0);
		this.translation.set(0, 0);
		this.rotation = 0;
		this.scale.set(1, 1);
		this.skew.set(0, 0);
		this.tilt.set(1, 1);
		this.squeeze = 1;
		this.alpha = 1;
		return this;
	},
	build: function(premultiply, inverted) {
		if (premultiply)
			this._matrix.concat(premultiply, inverted);
		else
			this._matrix.reset();

		if ((this.origin.x != 0) || (this.origin.y != 0))
			this._matrix.translate((this.size.width * this.origin.x) * -1, (this.size.height * this.origin.y) * -1);

		if (this.squeeze != 1)
			this._matrix.squeeze(this.squeeze);

		if ((this.skew.x != 0) || (this.skew.y != 0))
			this._matrix.skew(this.skew.x, this.skew.y);

		if ((this.scale.x != 0) || (this.scale.y != 0))
			this._matrix.scale(this.scale.x == 0 ? 0.001 : this.scale.x, this.scale.y == 0 ? 0.001 : this.scale.y);

		if (this.rotation % 360 != 0)
			this._matrix.rotate(this.rotation);

		if ((this.tilt.x != 1) || (this.tilt.y != 1))
			this._matrix.scale(this.tilt.y == 0 ? 0.001 : this.tilt.y, this.tilt.x == 0 ? 0.001 : this.tilt.x);

		if ((this.translation.x != 0) || (this.translation.y != 0))
			this._matrix.translate(this.translation.y, this.translation.x);

		this._matrix.alpha = this.alpha;

		this._modified = false;

		return this._matrix;
	},
	render: function(node) {
		node.dom.css(arena.Sprite.cssTransformOriginProperty(), '%1% %2%'.args(Math.round(this.origin.x * 100), Math.round(this.origin.y * 100)));
		node.dom.css(arena.Sprite.cssTransformProperty(), this.toString());
	},
	invalidate: function() {
		this._modified = true;
	},
	onChanged: function(propName) {
		this._modified = true;
		this.dispatchEvent(arena.geometry.Transform.CHANGED);
	},
	/** @returns arena.geometry.Point.temp */
	localToGlobal: function(x, y) { return this.matrix.localToGlobal(x, y); },
	/** @returns arena.geometry.Point.temp */
	globalToLocal: function(x, y) { return this.matrix.globalToLocal(x, y); },
	toString: function() {
		var transforms = '';

		if ((this.translation.x != 0) || (this.translation.y != 0))
			transforms += ' translate(%1px,%2px)'.args(this.translation.x, this.translation.y);

		if ((this.tilt.x != 0) || (this.tilt.y != 0))
			transforms += ' scale(%1,%2)'.args(this.tilt.x, this.tilt.y);

		if (this.rotation % 360 != 0)
			transforms += ' rotate(%1deg)'.args(this.rotation);


		if ((this.scale.x != 0) || (this.scale.y != 0))
			transforms += ' scale(%1,%2)'.args(this.scale.x, this.scale.y);

		if ((this.scale.x != 0) || (this.scale.y != 0))
			transforms += ' scale(%1,%2)'.args(this.scale.x, this.scale.y);

		if ((this.skew.x != 0) || (this.skew.y != 0))
			transforms += ' skew(%1deg,%2deg)'.args(this.skew.x, this.skew.y);

		if (this.squeeze != 1)
			transforms += ' scale(%1,%2)'.args(this.squeeze, 1/this.squeeze);



		return transforms;
	}
};

Object.defineProperty(arena.geometry.Transform.prototype, 'matrix', {
	get: function() {
		if (this.modified)
			this.build();
		return this._matrix;
	}
});

/***************************
 * arena.geometry.Transform *
 ***************************/
arena.geometry.Transform.toClass(
	/*domainName*/ 'arena.geometry.Transform',
	/*superClass*/ arena.Object,
	/*instance.properties*/ ['width', 'height', 'origin', 'translation', 'rotation', 'scale', 'skew', 'squeeze', 'tilt', 'alpha', '_matrix', 'modified']
).temporary();