/**
 * A arena.Sprite
 * @class
 */
arena.Sprite = function Sprite(id) {
	/** call super constructor */
	arena.Object.call(this);

	/** set default properties */
	this.id = id;
	this.parent = null;
	this.children = [];
	this.dom = jQuery('<div class="arena-sprite" id="' + id + '"/>');
	this.dom.data('arena-sprite', this);
	this.transform = new arena.geometry.Transform();
	this.transform.addEvent(arena.geometry.Transform.CHANGED, this.onTransformChanged, this);
};

/** define arena.Sprite instance methods */
arena.Sprite.prototype = {
	addToDom: function(domContainer) {
		domContainer.appendChild(this.dom.element);
	},

	renderGeometry: function() {
		if (this.transform.modified) {
			this.transform.render(this);
			for (var i=0; i<this.children.length; i++)
				this.children[i].renderGeometry();
		}
	},

	add: function(node) {
		node.parent = this;
		this.children.add(node);
		node.addToDom(this.dom.element);
	},

	onTransformChanged: function() {
		/** invalidate me and my childrens transforms */
		//this.transform.invalidate();
		this.renderGeometry();
		//for (var i=0; i<this.children.length; i++)
		//	this.children[i].onTransformChanged();
	},

	update: function() {

	},

	/** transforms **/
	location: function(x, y) {
		if (!(x || y)) return this.transform.translation;
		this.transform.translation.x = x;
		this.transform.translation.y = y;
		return this;
	},
	move: function(x, y) {
		this.transform.translation.moveXY(x, y);
	},
	rotation: function(deg) {
		if (!deg) return this.transform.rotation;
		this.transform.rotation = deg;
		return this;
	},
	rotate: function(deg) {
		this.transform.rotation += deg;
		return this;
	},
	scale: function(x, y) {
		if (!(x || y)) return this.transform.scale;
		this.transform.scale.x = x;
		this.transform.scale.y = y;
		return this;
	},
	scaleBy: function(x, y) {
		this.scale(this.transform.scale.x * x, this.transform.scale.y * y);
	},
	origin: function(x, y) {
		if (!(x || y)) return this.transform.origin;
		this.transform.origin.x = x;
		this.transform.origin.y = y;
		return this;
	},
	squeeze: function(squeeze) {
		this.transform.squeeze = squeeze;
		return this;
	},
	tilt: function(x, y) {
		if (!(x || y)) return this.transform.tilt;
		this.transform.tilt.x = x;
		this.transform.tilt.y = y;
		return this;
	},
	skew: function(x, y) {
		if (!(x || y)) return this.transform.skew;
		this.transform.skew.x = x;
		this.transform.skew.y = y;
		return this;
	},

	/** motion **/
	setTransition: function(propName, duration, easingMethod) {
		this.dom.css(arena.Sprite.cssTransitionProperty(), '%1 %2s %3'.args(propName, duration, easingMethod));
	},

	/** events **/
	mouseover: function(fn) {
		this.dom.mouseover(fn.context(this));
		return this;
	},
	mouseout: function(fn) {
		this.dom.mouseout(fn.context(this));
		return this;
	},
	mousemove: function(fn) {
		this.dom.mousemove(fn.context(this));
		return this;
	},
	mousedown: function(fn) {
		this.dom.mousedown(fn.context(this));
		return this;
	},
	mouseup: function(fn) {
		this.dom.mouseup(fn.context(this));
		return this;
	},
	click: function(fn) {
		this.dom.click(fn.context(this));
		return this;
	},
	dblclick: function(fn) {
		this.dom.dblclick(fn.context(this));
		return this;
	}
};

arena.Sprite.cssTransformProperty = function() {
	/**
	 The transform property is not supported in any browser.

	 Internet Explorer supports an alternative, the -ms-transform property (2D transforms only).

	 Firefox supports an alternative, the -moz-transform property (2D transforms only).

	 Opera supports an alternative, the -o-transform property (2D transforms only).

	 Safari and Chrome support an alternative, the -webkit-transform property (3D and 2D transforms).
	 */
	return '-webkit-transform';
};

arena.Sprite.cssTransformOriginProperty = function() {
	/**
	 Internet Explorer supports an alternative, the -ms-transform-origin property, but only for 2D-transforms.

	 Firefox supports an alternative, the -moz-transform-origin property, but only for 2D-transforms.

	 Opera supports an alternative, the -o-transform-origin property, but only for 2D-transforms.

	 Safari and Chrome supports an alternative, the -webkit-transform-origin property, on both 2D- and 3D-transfoms.
	 */
	return '-webkit-transform-origin';
};

arena.Sprite.cssTransitionProperty = function() {
	/**
	 The transition property is not supported in any browsers.

	 Firefox 4 supports an alternative, the -moz-transition property.

	 Safari and Chrome support an alternative, the -webkit-transition property.

	 Opera supports an alternative, the -o-transition property.
	 */
	return '-webkit-transition';
};

/***************************
 * arena.Sprite *
 ***************************/
arena.Sprite.toClass(
	/*domainName*/ 'arena.Sprite',
	/*superClass*/ arena.Object,
	/*instance.properties*/ ['id', 'dom', 'transform', 'parent', 'children']
).temporary();