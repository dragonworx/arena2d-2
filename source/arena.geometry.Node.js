/**
 * A arena.geometry.Node
 * @class
 */
arena.geometry.Node = function Node() {
	/** call super constructor */
	arena.Object.call(this);

	/** set default properties */
	this.transform = new arena.geometry.Transform();
	var size = this.defaultSize();
	this.transform.size.set(size.width, size.height);
};

/** define arena.geometry.Node instance methods */
arena.geometry.Node.prototype = {
	defaultSize: function() { return size(100, 100); },

	setXY: function(x, y) {
		this.transform.translation.set(x, y);
		this.transform.modify();
		this.dispatchEvent('geometryChanged', 'xy');
		return this;
	}
};

/***************************
 * arena.geometry.Node *
 ***************************/
arena.geometry.Node.toClass(
	/*domainName*/ 'arena.geometry.Node',
	/*superClass*/ arena.Object,
	/*instance.properties*/ ['transform', 'parent', 'children']
).temporary();