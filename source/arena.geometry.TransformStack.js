/**
 * A arena.geometry.TransformStack
 * @class
 */
arena.geometry.TransformStack = function TransformStack() {
	/** call super constructor */
	arena.Object.call(this);

	/** set default properties */
	this.matrix = new arena.geometry.Matrix();
	this.currentMatrix = new arena.geometry.Matrix();
	this.depth = 0;
};

/** define arena.geometry.TransformStack instance methods */
arena.geometry.TransformStack.prototype = {
	clear: function() {
		this.matrix.reset();
		this.currentMatrix.reset();
		return this;
	},
	push: function(element) {
		this.depth++;
		this.matrix.clone(this.currentMatrix);
		this.currentMatrix.concat(element.matrix, true); // TODO: make transform currentMatrix accessor
		return this;
	},
	pop: function() {
		this.depth--;
		this.currentMatrix.clone(this.matrix);
		return this;
	}
};

/***************************
 * arena.geometry.TransformStack *
 ***************************/
arena.geometry.TransformStack.toClass(
	/*domainName*/ 'arena.geometry.TransformStack',
	/*superClass*/ arena.Object,
	/*instance.properties*/ ['currentMatrix', 'matrix', 'depth']
).temporary();