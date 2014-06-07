/**
 * A arena.display.Gradient
 * @class
 */
arena.display.Gradient = function Gradient() {
	/** call super constructor */
	arena.Object.call(this);

	/** set default properties */
	this.gradient = undefined;
	this.stops = [];

};

/** define arena.display.Gradient instance methods */
arena.display.Gradient.prototype = {
	addColorStop: function(offset, color) {
		this.stops.add({offset:offset, color:color});
		this.gradient = undefined;
	},
	setColorStop: function(index, offset, color) {
		this.stops[index].offset = offset;
		this.stops[index].color = color;
		this.gradient = undefined;
	},
	setColorStopOffset: function(index, offset) {
		this.setColorStop(index, offset, this.stops[index].color);
	},
	setColorStopColor: function(index, color) {
		this.setColorStop(index, this.stops[index].offset, color);
	},
	createGradient: function(bitmap) {
		// subclasses should override
	},
	renderOn: function(bitmap) {
		if (!this.gradient) {
			this.gradient = this.createGradient(bitmap);
			this.renderColorStops(bitmap);
		}
		return this.gradient;
	},
	renderColorStops: function(bitmap) {
		for (var i=0; i<this.stops.length; i++)
			this.gradient.addColorStop(this.stops[i].offset, this.stops[i].color.renderOn(bitmap));
	}
};

/***************************
 * arena.display.Gradient *
 ***************************/
arena.display.Gradient.toClass(
	/*domainName*/ 'arena.display.Gradient',
	/*superClass*/ arena.Object,
	/*instance.properties*/ ['gradient', 'stops']
).temporary();