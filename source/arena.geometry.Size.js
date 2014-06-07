/**
 * A arena.geometry.Size
 * @class
 */
arena.geometry.Size = function Size(width, height) {
	/** call super constructor */
	arena.Object.call(this);

	/** set default properties */
	/** set default properties */
	this.width = width;
	this.height = height;

};

arena.geometry.Size.WIDTH_CHANGED = 'widthChanged';
arena.geometry.Size.HEIGHT_CHANGED = 'heightChanged';

/** define arena.geometry.Point instance methods */
arena.geometry.Size.prototype = {
	isNaN: function() {
		return isNaN(this.width) || isNaN(this.height);
	},
	set: function(width, height) {
		this.width = width;
		this.height = height;
		return this;
	},
	setWidth: function(width) {
		this.width = width;
		return this;
	},
	setHeight: function(height) {
		this.height = height;
		return this;
	},
	clear: function() {
		this.width = this.height = undefined;
		return this;
	},
	toString: function() {
		return 'size(%1,%2)'.args(this.width, this.height);
	}
};

/***************************
 * arena.geometry.Size *
 ***************************/
arena.geometry.Size.toClass(
	/*domainName*/ 'arena.geometry.Size',
	/*superClass*/ arena.Object,
	/*instance.properties*/ ['width' , 'height']
).temporary();

window.size = function(width, height) {
	return arena.geometry.Size.temp.set(width, height);
};