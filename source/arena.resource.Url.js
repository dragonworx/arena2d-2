/**
 * A arena.resource.Url
 * @class
 */
arena.resource.Url = function Url(text) {
	/** call super constructor */
	arena.Object.call(this);

	/** set default properties */
	// http://localhost:8888/arena2d/#Bitmap
	// img/212451_f520.jpg?abc=123#stuff
	if (text) {
		this.rawUrl = text.trim();
		this.extension = text.match(/\.[a-zA-Z0-9]+/g);
		this.extension = this.extension.last().replace(/\./, '');
	}
};

/** define arena.resource.Url instance methods */
arena.resource.Url.prototype = {
	resourceClassName: function() {
		/** Guess whether we are an image */
		var types = arena.resource.IMAGE_TYPES;
		for (var i = 0; i < types.length; i++)
			if (types[i].equals(this.extension))
				return arena.resource.IMAGE;

		/** Guess whether we are an audio */
		for (var type in arena.resource.AUDIO_TYPES)
			if (type.equals(this.extension))
				return arena.resource.AUDIO;

		return arena.resource.RESOURCE;
	},

	toString: function() {
		return this.rawUrl;
	}
};

/***************************
 * arena.resource.Url *
 ***************************/
arena.resource.Url.toClass(
	/*domainName*/ 'arena.resource.Url',
	/*superClass*/ arena.Object,
	/*instance.properties*/ ['rawUrl', 'scheme', 'host', 'port', 'path', 'file', 'extension', 'query', 'hash']
).temporary();