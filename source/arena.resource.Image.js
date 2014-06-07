/**
 * A arena.resource.Image
 * @class
 */
arena.resource.Image = function Image(url) {
	/** call super constructor */
	arena.resource.Resource.call(this, url);

	/** set default properties */
	this.type = arena.resource.IMAGE;

	this.img = jQuery("<image/>");
	this.width = 0;
	this.height = 0;

};

/** define arena.resource.Image instance methods */
arena.resource.Image.prototype = {
	activateDownload: function() {
		arena.dom.bind(this.img, arena.resource.IMAGE_LOADED, this.onImageLoaded.context(this));
		this.img.attr('src', this.url.toString());
	},

	onImageLoaded: function() {
		arena.dom.unbind(this.img, arena.resource.IMAGE_LOADED, this.onImageLoaded.context(this));
		this.loaded = true;
		this.width = this.img.width;
		this.height = this.img.height;
		this.dispatchEvent(arena.resource.READY, this);
	},

	resource: function() {
		return this.img;
	},

	toString: function() {
		if (this.loaded)
			return 'image(%1[%2x%3])'.args(this.url.toString(), this.width, this.height);
		else
			return 'image(%1[-])'.args(this.url.toString());
	}
};

/***************************
 * arena.resource.Image *
 ***************************/
arena.resource.Image.toClass(
	/*domainName*/ 'arena.resource.Image',
	/*superClass*/ arena.resource.Resource,
	/*instance.properties*/ ['img']
);