/**
 * A arena.geometry.Rectangle
 * @class
 */
arena.geometry.Rectangle = function Rectangle(x, y, w, h) {
	/** call super constructor */
	arena.Object.call(this);

	/** set default properties */
	this.x = x;
	this.y = y;
	this.width = w;
	this.height = h;
};

arena.geometry.Rectangle.X_CHANGED = 'xChanged';
arena.geometry.Rectangle.Y_CHANGED = 'yChanged';
arena.geometry.Rectangle.WIDTH_CHANGED = 'widthChanged';
arena.geometry.Rectangle.HEIGHT_CHANGED = 'heightChanged';

/** define arena.geometry.Rectangle instance methods */
arena.geometry.Rectangle.prototype = {
	isNaN: function() {
		return isNaN(this.x) || isNaN(this.y) || isNaN(this.width) || isNaN(this.height);
	},
	set: function(x, y, width, height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		return this;
	},
	setXY: function(x, y) {
		this.x = x;
		this.y = y;
		return this;
	},
	setCornerXY: function(x, y) {
		this.width = x - this.x;
		this.height = y - this.y;
		this.normalise();
		return this;
	},
	setWidth: function(w) {
		this.width = w;
		return this;
	},
	setHeight: function(h) {
		this.height = h;
		return this;
	},
	setTop: function(y) {
		this.y = y;
		this.normalise();
		return this;
	},
	setLeft: function(x) {
		this.x = x;
		this.normalise();
		return this;
	},
	setRight: function(x) {
		this.width = x - this.x;
		this.normalise();
		return this;
	},
	setBottom: function(y) {
		this.height = y - this.y;
		this.normalise();
		return this;
	},
	setSize: function(w, h) {
		this.width = w;
		this.height = h;
		this.normalise();
		return this;
	},
	setCenter: function(x, y) {
		var w = this.width / 2;
		var h = this.height / 2;
		this.x = x - w;
		this.y = y - h;
		return this;
	},
	/** @returns arena.geometry.Point.temp */
	location: function() { return arena.geometry.Point.temp.set(this.x, this.y); },
	/** @returns arena.geometry.Point.temp */
	origin: function() { return arena.geometry.Point.temp.set(this.x, this.y); },
	/** @returns arena.geometry.Point.temp */
	corner: function() { return arena.geometry.Point.temp.set(this.x + this.width, this.y + this.height); },
	/** @returns arena.geometry.Point.temp */
	center: function() { return arena.geometry.Point.temp.set(this.x + this.width / 2, this.y + this.height / 2); },
	top: function() { return this.y; },
	left: function() { return this.x; },
	right: function() { return this.x + this.width; },
	bottom: function() { return this.y + this.height; },
	/** @returns arena.geometry.Point.temp */
	topLeft: function() { return arena.geometry.Point.temp.set(this.x, this.y); },
	/** @returns arena.geometry.Point.temp */
	topRight: function() { return arena.geometry.Point.temp.set(this.x + this.width, this.y); },
	/** @returns arena.geometry.Point.temp */
	bottomLeft: function() { return arena.geometry.Point.temp.set(this.x, this.y + this.height); },
	/** @returns arena.geometry.Point.temp */
	bottomRight: function() { return arena.geometry.Point.temp.set(this.x + this.width, this.y + this.height); },
	/** @returns arena.geometry.Point.temp */
	leftSide: function() { return arena.geometry.Line.temp.set(this.x, this.y, this.x, this.y + this.height); },
	/** @returns arena.geometry.Point.temp */
	rightSide: function() { return arena.geometry.Line.temp.set(this.x + this.width, this.y, this.x + this.width, this.y + this.height); },
	/** @returns arena.geometry.Point.temp */
	topSide: function() { return arena.geometry.Line.temp.set(this.x, this.y, this.x, this.y + this.height); },
	/** @returns arena.geometry.Point.temp */
	bottomSide: function() { return arena.geometry.Line.temp.set(this.x, this.y, this.x, this.y + this.height); },
	/** @returns arena.geometry.Line.temp */
	primaryDiagonal: function() { return this.location().copy().to(this.corner()); },
	/** @returns arena.geometry.Line.temp */
	secondaryDiagonal: function() { return this.location().plusY(this.height()).copy().to(this.location().plusX(this.width())); },
	/** @returns arena.geometry.Line.temp */
	centerVertical: function() { return this.topSide().at(0.5).copy().to(this.bottomSide().at(0.5)); },
	/** @returns arena.geometry.Line.temp */
	centerHorizontal: function() { return this.leftSide().at(0.5).copy().to(this.rightSide().at(0.5)); },
	clear: function() {
		this.x = this.y = this.width = this.height = undefined;
		return this;
	},
	isEmpty: function() { return !this.isNaN() && (this.width == 0) && (this.height == 0); },
	containsPoint: function(x, y) {
		if ((x < this.x) || (x > this.x + this.width)) return false;
		if ((y < this.y) || (y > this.y + this.height)) return false;
		return true;
	},
	contains: function(x, y, width, height, completely) {
		var result = this.containsPoint(x, y) && this.containsPoint(x + width, y + height);
		if ((completely != true) && (result != true)) return this.intersects(x, y, width, height);
		return result;
	},
	intersects: function(x, y, width, height) {
		return this.left() <= (x + width) &&
			x <= this.right() &&
			this.top() <= (y + height) &&
			y <= this.bottom();
	},
	move: function(x, y) {
		this.x += x;
		this.y += y;
		return this;
	},
	/** @returns arena.geometry.Rectangle.temp */
	moved: function(x, y) {
		return this.temp.move(x, y);
	},
	scale: function(w, h) {
		h = h ? h : w;
		this.x = this.x * w;
		this.y = this.y * h;
		this.width = this.width * w;
		this.height = this.height * h;
		return this;
	},
	/** @returns arena.geometry.Rectangle.temp */
	scaled: function(w, h) {
		return this.temp.scale(w, h);
	},
	scaleSize: function(w, h) {
		h = h ? h : w;
		this.width = this.width * w;
		this.height = this.height * h;
		return this;
	},
	/** @returns arena.geometry.Rectangle.temp */
	scaledSize: function(w, h) {
		return this.temp.scaleSize(w, h);
	},
	inflate: function(width, height) {
		var x = this.x;
		var y = this.y;
		var w = this.width;
		var h = this.height;
		this.x = x - width;
		this.y = y - height;
		this.width = this.width + (width * 2);
		this.height = this.height + (height * 2);
		return this;
	},
	/** @returns arena.geometry.Rectangle.temp */
	inflated: function(width, height) {
		return this.temp.inflate(width, height);
	},
	deflate: function(width, height) {
		return this.inflate(width * -1, height * -1);
	},
	/** @returns arena.geometry.Rectangle.temp */
	deflated: function(width, height) {
		return this.temp.deflate(width, height);
	},
	setSizeCenter: function(width, height) {
		this.disableEvents();
		this.x = this.x + (this.width / 2) - (width / 2);
		this.y = this.y + (this.height / 2) - (height / 2);
		this.width = width;
		this.height = height;
		return this;
	},
	encompass: function(/*accepts variable amounts of point objects through arguments array*/) {
		var xmin = 100000;
		var ymin = 100000;
		var xmax = -100000;
		var ymax = -100000;
		for (var i = 0; i < arguments.length; i++) {
			var p = arguments[i];
			xmin = Math.min(p.x, xmin);
			ymin = Math.min(p.y, ymin);
			xmax = Math.max(p.x, xmax);
			ymax = Math.max(p.y, ymax);
		}
		this.x = xmin;
		this.y = ymin;
		this.width = xmax - xmin;
		this.height = ymax - ymin;
		return this;
	},
	/** @type arena.geometry.Rectangle.temp */
	union: function(x, y, width, height) {
		if (this.x == x && this.y == y && this.width == width && this.height == height) return this;
		if (this.isNaN())
			return arena.geometry.Rectangle.temp.set(x, y, width, height);
		var l = Math.min(this.x, x);
		var t = Math.min(this.y, y);
		var r = Math.max(this.x + this.width, x + width);
		var b = Math.max(this.y + this.height, y + height);
		return arena.geometry.Rectangle.temp.set(l, t, r - l, b - t);
	},
	/** @type arena.geometry.Rectangle.temp */
	intersected: function(x, y, width, height) {
		if (!this.intersects(x, y, width, height)) return this.temp;
		if (this.x == x && this.y == y && this.width == width && this.height == height) return this.temp;
		var left = Math.max(this.x, x);
		var top = Math.max(this.y, y);
		var right = Math.min(this.right(), x + width);
		var bottom = Math.min(this.bottom(), y + height);
		return arena.geometry.Rectangle.temp.set(left, top, right - left, bottom - top);
	},
	normalise: function() {
		if (this.right() < this.x) {
			var x = this.x;
			this.x = this.right();
			this.width = x - this.x;
		}
		if (this.bottom() < this.y) {
			var y = this.y;
			this.y = this.bottom();
			this.height = y - this.y;
		}
		return this;
	},
	normalised: function() {
		this.temp.normalise();
	},
	subdivide: function(border) {
		border = border ? border : 0;
		var w = (this.width / 2) - border;
		var h = (this.height / 2) - border;
		var array = [];
		array.push(new arena.geometry.Rectangle(this.x + border, this.y + border, w, h));
		array.push(new arena.geometry.Rectangle(this.x + border + w, this.y + border, w, h));
		array.push(new arena.geometry.Rectangle(this.x + border, this.y + border + h, w, h));
		array.push(new arena.geometry.Rectangle(this.x + border + w, this.y + border + h, w, h));
		return array;
	},
	areasOutside: function(x, y, width, height) {
		if (!this.intersects(x, y, width, height))
			return Array.from(this);

		var r = new arena.geometry.Rectangle(x, y, width, height);
		var yOrigin, yCorner;
		var list = [];
		var _origin = this.origin();
		var _corner = this.corner();
		var r_origin = r.origin();
		var r_corner = r.corner();

		if (r_origin.y > _origin.y) {
			yOrigin = r_origin.y;
			list.addLast(_origin.corner(_corner.x.at(yOrigin)));
		} else {
			yOrigin = _origin.y;
		}

		if (r_corner.y < _corner.y) {
			yCorner = r_corner.y;
			list.addLast(_origin.at(yCorner).corner(_corner));
		} else {
			yCorner = _corner.y;
		}

		if (r_origin.x > _origin.x)
			list.addLast(_origin.x.at(yOrigin).corner(r_origin.x.at(yCorner)));

		if (r_corner.x < _corner.x)
			list.addLast(r_corner.x.at(yOrigin).corner(_corner.x.at(yCorner)));
		return list;
	},
	split: function(x, y, width, height, merge) {
		var list1 = this.areasOutside(x, y, width, height);
		if (merge && (!this.contains(x, y, width, height, true))) {
			list1.insert(new arena.geometry.Rectangle(x, y, width, height));
			return list1;
		}
		var list2 = new arena.geometry.Rectangle(x, y, width, height).areasOutside(this.x, this.y, this.width, this.height);
		list1.addAll(list2);
		if (this.intersects(x, y, width, height))
			list1.insert(this.copy().intersected(x, y, width, height));
		return list1;
	},
	round: function() {
		this.x = Math.round(this.x);
		this.y = Math.round(this.y);
		this.width = Math.round(this.width);
		this.height = Math.round(this.height);
		return this;
	},
	/** @returns arena.geometry.Rectangle.temp */
	rounded: function() { return this.temp.round(); },
	floor: function() {
		this.x = Math.floor(this.x);
		this.y = Math.floor(this.y);
		this.width = Math.floor(this.width);
		this.height = Math.floor(this.height);
		return this;
	},
	/** @returns arena.geometry.Rectangle.temp */
	floored: function() { return this.temp.floor(); },
	ceil: function() {
		this.x = Math.ceil(this.x);
		this.y = Math.ceil(this.y);
		this.width = Math.ceil(this.width);
		this.height = Math.ceil(this.height);
		return this;
	},
	/** @returns arena.geometry.Rectangle.temp */
	ceiled: function() { return this.temp.ceil(); },
	toString: function() { return "rect($1,$2,$3,$4)".format(this.x, this.y, this.width, this.height); }
};

/***************************
 * arena.geometry.Rectangle *
 ***************************/
arena.geometry.Rectangle.toClass(
	/*domainName*/ 'arena.geometry.Rectangle',
	/*superClass*/ arena.Object,
	/*instance.properties*/ ['x', 'y', 'width', 'height']
).temporary();

window.rect = function(x, y, w, h) {
	return arena.geometry.Rectangle.temp.set(x, y, w, h);
};